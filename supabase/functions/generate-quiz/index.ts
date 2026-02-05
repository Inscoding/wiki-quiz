import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || !url.includes('wikipedia.org')) {
      return new Response(
        JSON.stringify({ success: false, error: 'Please provide a valid Wikipedia URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract article title from URL
    const urlMatch = url.match(/\/wiki\/([^#?]+)/);
    if (!urlMatch) {
      return new Response(
        JSON.stringify({ success: false, error: 'Could not extract article title from URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const articleTitle = decodeURIComponent(urlMatch[1].replace(/_/g, ' '));
    console.log('Fetching article:', articleTitle);

    // Fetch Wikipedia content using the REST API
    const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(urlMatch[1])}`;
    const wikiResponse = await fetch(wikiApiUrl);
    
    if (!wikiResponse.ok) {
      console.error('Wikipedia API error:', wikiResponse.status);
      return new Response(
        JSON.stringify({ success: false, error: 'Could not fetch Wikipedia article. Please check the URL.' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const wikiSummary = await wikiResponse.json();

    // Fetch the full article content
    const fullContentUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(urlMatch[1])}&prop=extracts&explaintext=true&format=json&origin=*`;
    const fullContentResponse = await fetch(fullContentUrl);
    const fullContentData = await fullContentResponse.json();
    
    const pages = fullContentData.query?.pages;
    const pageId = Object.keys(pages || {})[0];
    const articleText = pages?.[pageId]?.extract || wikiSummary.extract || '';

    if (!articleText || articleText.length < 100) {
      return new Response(
        JSON.stringify({ success: false, error: 'Article content is too short or not available.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Truncate to avoid token limits
    const truncatedText = articleText.substring(0, 15000);

    console.log('Generating quiz for:', wikiSummary.title);

    const systemPrompt = `You are an expert educational content generator. Generate a high-quality, factual quiz based STRICTLY on the provided Wikipedia article content.

CRITICAL RULES:
1. Use ONLY information from the provided article text
2. DO NOT add external knowledge or hallucinate facts
3. Every question must be traceable to the article content
4. Keep explanations short and factual
5. Output must be valid JSON only - no markdown, no commentary

OUTPUT FORMAT (JSON ONLY):
{
  "url": "<the wikipedia url>",
  "title": "<exact article title>",
  "summary": "<3-5 sentence summary of the article>",
  "key_entities": {
    "people": ["<names of people mentioned>"],
    "organizations": ["<organizations mentioned>"],
    "locations": ["<locations mentioned>"]
  },
  "sections": ["<main topics/sections from the article>"],
  "quiz": [
    {
      "question": "<question text>",
      "options": { "A": "<option>", "B": "<option>", "C": "<option>", "D": "<option>" },
      "answer": "<A, B, C, or D>",
      "difficulty": "<easy|medium|hard>",
      "explanation": "<brief explanation>"
    }
  ],
  "related_topics": ["<3-5 related Wikipedia topics>"]
}

Generate 5-10 questions covering different aspects of the article. Mix easy, medium, and hard questions.`;

    const userPrompt = `Wikipedia Article URL: ${url}
Article Title: ${wikiSummary.title}
Article Description: ${wikiSummary.description || 'N/A'}

Article Content:
${truncatedText}

Generate the quiz JSON now. Remember: ONLY use facts from the article above.`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await aiResponse.text();
      console.error('AI gateway error:', aiResponse.status, errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'AI service error. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const aiData = await aiResponse.json();
    const content = aiData.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to generate quiz content.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON from the response (handle potential markdown code blocks)
    let quizData;
    try {
      // Remove markdown code blocks if present
      const jsonString = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      quizData = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, content);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to parse quiz data. Please try again.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Ensure the URL is set correctly
    quizData.url = url;

    console.log('Quiz generated successfully for:', quizData.title);

    return new Response(
      JSON.stringify({ success: true, data: quizData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error generating quiz:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
