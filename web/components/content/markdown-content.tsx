import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { localizePublicText } from "@/lib/localize";

export function MarkdownContent({ content }: { content: string }) {
  const localized = localizePublicText(content);
  return (
    <div className="prose-fund">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{localized}</ReactMarkdown>
    </div>
  );
}
