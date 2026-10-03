/**
 * Minimal markdown renderer for info drawers.
 * Supports: # ## ### headings, paragraphs, "- " lists, [label](url) links,
 * and a standalone price line such as €35.00.
 */
const PRICE_LINE = /^(?:€|£|\$)\s?\d+(?:[.,]\d{2})?$/;
function renderInline(text) {
  const parts = [];
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let lastIndex = 0;
  let match = pattern.exec(text);
  let key = 0;

  while (match) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const href = match[2];
    if (/^(https?:|mailto:)/i.test(href)) {
      parts.push(
        <a
          key={key}
          href={href}
          className="os-markdown-a"
          {...(href.toLowerCase().startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {match[1]}
        </a>
      );
      key += 1;
    } else {
      parts.push(match[0]);
    }

    lastIndex = match.index + match[0].length;
    match = pattern.exec(text);
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export default function OsMarkdown({ source = "" }) {
  if (!source.trim()) {
    return <p className="os-empty">No info.</p>;
  }

  const blocks = source.trim().split(/\n{2,}/);

  return (
    <div className="os-markdown">
      {blocks.map((block, index) => {
        const line = block.trim();
        const lines = line.split("\n");

        if (lines.every((item) => item.trim().startsWith("- "))) {
          return (
            <ul key={index} className="os-markdown-ul">
              {lines.map((item, itemIndex) => (
                <li key={itemIndex}>{renderInline(item.trim().slice(2))}</li>
              ))}
            </ul>
          );
        }

        if (line.startsWith("### ")) {
          return (
            <h3 key={index} className="os-markdown-h3">
              {renderInline(line.slice(4))}
            </h3>
          );
        }

        if (line.startsWith("## ")) {
          return (
            <h2 key={index} className="os-markdown-h2">
              {renderInline(line.slice(3))}
            </h2>
          );
        }

        if (line.startsWith("# ")) {
          return (
            <h1 key={index} className="os-markdown-h1">
              {renderInline(line.slice(2))}
            </h1>
          );
        }

        if (PRICE_LINE.test(line)) {
          return (
            <p key={index} className="os-markdown-price">
              {line}
            </p>
          );
        }

        return (
          <p key={index} className="os-markdown-p">
            {lines.map((part, i) => (
              <span key={i}>
                {renderInline(part)}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
