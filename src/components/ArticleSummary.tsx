import { QuizData } from "@/types/quiz";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink, User, Building2, MapPin, BookOpen } from "lucide-react";

interface ArticleSummaryProps {
  data: QuizData;
}

const ArticleSummary = ({ data }: ArticleSummaryProps) => {
  return (
    <section className="py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Article Header */}
          <Card className="card-elevated mb-6 p-6 md:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
                {data.title}
              </h2>
              <a
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="hidden sm:inline">View Article</span>
              </a>
            </div>

            <p className="mb-6 leading-relaxed text-muted-foreground">
              {data.summary}
            </p>

            {/* Sections */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                <BookOpen className="h-4 w-4" />
                Article Sections
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.sections.map((section, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1"
                  >
                    {section}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Entities */}
            <div className="grid gap-4 md:grid-cols-3">
              {data.key_entities.people.length > 0 && (
                <div className="rounded-lg bg-secondary/50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <User className="h-4 w-4 text-primary" />
                    People
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {data.key_entities.people.map((person, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {person}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {data.key_entities.organizations.length > 0 && (
                <div className="rounded-lg bg-secondary/50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    Organizations
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {data.key_entities.organizations.map((org, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {org}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {data.key_entities.locations.length > 0 && (
                <div className="rounded-lg bg-secondary/50 p-4">
                  <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    Locations
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {data.key_entities.locations.map((location, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs"
                      >
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArticleSummary;
