import { Checkbox } from "./ui/checkbox";
import { Card } from "./ui/card";

interface PostOptionProps {
  id: string;
  title: string;
  description: string;
  caption: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function PostOption({
  id,
  title,
  description,
  caption,
  checked,
  onCheckedChange,
}: PostOptionProps) {
  return (
    <Card className="p-6 border-border/50 hover:border-border transition-colors">
      <div className="flex items-start gap-4">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="mt-1"
        />
        <div className="flex-1 space-y-3">
          <label
            htmlFor={id}
            className="cursor-pointer block"
          >
            <div className="mb-2">
              <h3 className="text-foreground">{title}</h3>
              <p className="text-muted-foreground text-sm mt-1">
                {description}
              </p>
            </div>
          </label>
          {caption && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border/30">
              <p className="text-foreground/90 whitespace-pre-wrap">
                {caption}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
