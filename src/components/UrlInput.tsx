import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Loader2, ArrowRight } from "lucide-react";

interface UrlInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInput = ({ onSubmit, isLoading }: UrlInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const isValidWikipediaUrl = (url: string) => {
    return url.includes("wikipedia.org") || url === "";
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
          <div className="card-elevated rounded-2xl bg-card p-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Link className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder="Paste a Wikipedia URL..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-14 border-0 bg-transparent pl-12 text-base shadow-none placeholder:text-muted-foreground focus-visible:ring-0"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                size="xl"
                disabled={isLoading || !url.trim() || !isValidWikipediaUrl(url)}
                className="shrink-0"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Quiz
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {url && !isValidWikipediaUrl(url) && (
            <p className="mt-3 text-center text-sm text-destructive">
              Please enter a valid Wikipedia URL
            </p>
          )}

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Try: en.wikipedia.org/wiki/Albert_Einstein
          </p>
        </form>
      </div>
    </section>
  );
};

export default UrlInput;
