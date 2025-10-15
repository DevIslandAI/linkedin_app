import { useState, useRef, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { ArrowLeft, Copy, Bold, Smile } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

interface PostEditorProps {
  content: string;
  onBack: () => void;
  onSave: (content: string) => void;
}

const LINKEDIN_FONTS = [
  { value: "default", label: "LinkedIn Default" },
  { value: "serif", label: "Serif" },
  { value: "monospace", label: "Monospace" },
];

const COMMON_EMOJIS = [
  "😊", "👍", "🎉", "💡", "🚀", "💪", "✨", "🔥",
  "📈", "💼", "🎯", "⚡", "👏", "🌟", "💯", "📊",
  "🏆", "🤝", "💰", "📱", "⏰", "✅", "❌", "⭐",
  "🎓", "🌍", "📝", "🔑", "💬", "📢", "🎨", "🤖"
];

export function PostEditor({ content, onBack, onSave }: PostEditorProps) {
  const [editedContent, setEditedContent] = useState(content);
  const [selectedFont, setSelectedFont] = useState("default");
  const [hasSelection, setHasSelection] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editedContent]);

  const handleTextSelection = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    setHasSelection(start !== end);
  };

  const isBoldChar = (char: string): boolean => {
    const code = char.charCodeAt(0);
    // Check if character is in Unicode bold ranges
    return (
      (code >= 120211 && code <= 120236) || // Bold A-Z
      (code >= 120237 && code <= 120262) || // Bold a-z
      (code >= 120782 && code <= 120791)    // Bold 0-9
    );
  };

  const handleBold = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = editedContent.substring(start, end);

    if (selectedText) {
      // Check if all alphanumeric characters are already bold
      const alphanumericChars = selectedText.split('').filter(char => /[A-Za-z0-9]/.test(char) || isBoldChar(char));
      const isBold = alphanumericChars.length > 0 && alphanumericChars.every(isBoldChar);
      
      let newText;
      if (isBold) {
        // Remove bold by converting back to normal
        newText = selectedText.split('').map(char => {
          const code = char.charCodeAt(0);
          if (code >= 120211 && code <= 120236) {
            // Bold A-Z to normal A-Z
            return String.fromCharCode(code - 120211 + 65);
          } else if (code >= 120237 && code <= 120262) {
            // Bold a-z to normal a-z
            return String.fromCharCode(code - 120237 + 97);
          } else if (code >= 120782 && code <= 120791) {
            // Bold 0-9 to normal 0-9
            return String.fromCharCode(code - 120782 + 48);
          }
          return char;
        }).join('');
      } else {
        // Apply bold using Unicode bold characters
        newText = selectedText.split('').map(char => {
          const code = char.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            // A-Z to bold A-Z
            return String.fromCharCode(code - 65 + 120211);
          } else if (code >= 97 && code <= 122) {
            // a-z to bold a-z
            return String.fromCharCode(code - 97 + 120237);
          } else if (code >= 48 && code <= 57) {
            // 0-9 to bold 0-9
            return String.fromCharCode(code - 48 + 120782);
          }
          return char;
        }).join('');
      }

      const newContent =
        editedContent.substring(0, start) +
        newText +
        editedContent.substring(end);

      setEditedContent(newContent);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + newText.length);
      }, 0);
    } else {
      toast.error("Please select text to make it bold");
    }
  };

  const insertEmoji = (emoji: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newContent =
      editedContent.substring(0, start) +
      emoji +
      editedContent.substring(end);

    setEditedContent(newContent);

    // Restore cursor position after emoji
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
  };

  const copyFullPost = () => {
    navigator.clipboard.writeText(editedContent);
    toast.success("Post copied to clipboard!");
  };

  const handleSave = () => {
    onSave(editedContent);
    toast.success("Changes saved!");
    onBack();
  };

  const getFontFamily = () => {
    switch (selectedFont) {
      case "serif":
        return "Georgia, serif";
      case "monospace":
        return "monospace";
      default:
        return "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Button>
          <h1 className="mb-2">Edit Post</h1>
          <p className="text-muted-foreground">
            Select text to format it with bold, or add emojis anywhere
          </p>
        </div>

        {/* Editor Toolbar - Show only when text is selected */}
        {hasSelection && (
          <Card className="p-6 mb-6 border-border/50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-muted-foreground">Format selected text:</p>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleBold}
                className="transition-all duration-200 active:scale-95"
              >
                <Bold className="w-4 h-4 mr-2" />
                Bold
              </Button>

              <p className="text-xs text-muted-foreground ml-2">
                💡 Bold formatting uses Unicode characters that work on LinkedIn
              </p>
            </div>
          </Card>
        )}

        {/* Editor Area */}
        <Card className="p-6 border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Font:</span>
                <Select value={selectedFont} onValueChange={setSelectedFont}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LINKEDIN_FONTS.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator orientation="vertical" className="h-6" />

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="transition-all duration-200 active:scale-95"
                  >
                    <Smile className="w-4 h-4 mr-2" />
                    Add Emoji
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid grid-cols-8 gap-2">
                    {COMMON_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => insertEmoji(emoji)}
                        className="text-2xl hover:bg-muted rounded p-2 transition-all duration-200 active:scale-90"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={copyFullPost}
              className="transition-all duration-200 active:scale-95"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Full Post
            </Button>
          </div>

          <textarea
            ref={textareaRef}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onSelect={handleTextSelection}
            onMouseUp={handleTextSelection}
            onKeyUp={handleTextSelection}
            className="w-full min-h-[500px] p-4 rounded-lg border border-border/50 bg-input-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            style={{
              fontFamily: getFontFamily(),
              lineHeight: "1.6",
            }}
            placeholder="Enter your LinkedIn post content..."
          />
          
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {editedContent.length} characters
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onBack}
                className="transition-all duration-200 active:scale-95"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="transition-all duration-200 active:scale-95"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
