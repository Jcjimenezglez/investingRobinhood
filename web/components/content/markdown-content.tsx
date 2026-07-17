import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Demote markdown # headings to h2 so pages keep a single document h1. */
const markdownComponents = {
  h1: ({
    children,
  }: {
    children?: React.ReactNode;
  }) => <h2>{children}</h2>,
};

export function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose-fund">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
