import { supabase } from '@/integrations/supabase/client';
import { QuizData } from '@/types/quiz';

export interface QuizResponse {
  success: boolean;
  error?: string;
  data?: QuizData;
}

export async function generateQuiz(url: string): Promise<QuizResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('generate-quiz', {
      body: { url },
    });

    if (error) {
      console.error('Edge function error:', error);
      return { success: false, error: error.message || 'Failed to generate quiz' };
    }

    if (!data.success) {
      return { success: false, error: data.error || 'Failed to generate quiz' };
    }

    return { success: true, data: data.data };
  } catch (err) {
    console.error('API error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
