import { Card } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MoreHorizontal, ThumbsUp, MessageCircle, Repeat2, Send, Copy, Edit2 } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface LinkedInPostPreviewProps {
  content: string;
  onCopy: (content: string) => void;
  onEdit?: (content: string) => void;
}

export function LinkedInPostPreview({ content, onCopy, onEdit }: LinkedInPostPreviewProps) {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCopy(content);
    toast.success("Post copied to clipboard!");
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(content);
    }
  };

  return (
    <Card 
      className="relative transition-all duration-200 hover:shadow-lg border-border/50 bg-white overflow-hidden group"
    >
      {/* Action Icons - Top Right */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <button
          onClick={handleCopy}
          className="p-2 bg-white rounded-full shadow-md hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-90 border border-border/50"
          title="Copy post"
        >
          <Copy className="w-4 h-4" />
        </button>
        {onEdit && (
          <button
            onClick={handleEdit}
            className="p-2 bg-white rounded-full shadow-md hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-90 border border-border/50"
            title="Edit post"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                IA
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-foreground">Island AI</p>
              <p className="text-xs text-muted-foreground">AI & Automation Consulting</p>
              <p className="text-xs text-muted-foreground">1h • 🌐</p>
            </div>
          </div>
          <button className="text-muted-foreground hover:bg-muted rounded p-1 transition-all duration-200 active:scale-90">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <div className="whitespace-pre-wrap text-sm text-foreground/90 line-clamp-[12]">
          {content}
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-t border-border/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-[#0a66c2] flex items-center justify-center">
                <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
              </div>
            </div>
            <span className="ml-1">127</span>
          </div>
          <div>
            <span>23 comments • 8 reposts</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 border-t border-border/30">
        <div className="flex items-center justify-around">
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted text-muted-foreground transition-all duration-200 active:scale-95">
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm">Like</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted text-muted-foreground transition-all duration-200 active:scale-95">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">Comment</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted text-muted-foreground transition-all duration-200 active:scale-95">
            <Repeat2 className="w-5 h-5" />
            <span className="text-sm">Repost</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-muted text-muted-foreground transition-all duration-200 active:scale-95">
            <Send className="w-5 h-5" />
            <span className="text-sm">Send</span>
          </button>
        </div>
      </div>
    </Card>
  );
}
