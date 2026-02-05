import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Bookmark, ArrowRight } from "lucide-react";

interface RelatedTopicsProps {
  topics: string[];
}

const RelatedTopics = ({ topics }: RelatedTopicsProps) => {
  return (
    <section className="py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <Card className="card-elevated p-6 md:p-8">
            <h3 className="mb-4 flex items-center gap-2 font-serif text-xl font-semibold text-foreground">
              <Bookmark className="h-5 w-5 text-accent" />
              Related Topics
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Continue learning with these related Wikipedia articles
            </p>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <a
                  key={index}
                  href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topic.replace(/ /g, "_"))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer px-4 py-2 text-sm transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                  >
                    {topic}
                    <ArrowRight className="ml-1 h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Badge>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RelatedTopics;
