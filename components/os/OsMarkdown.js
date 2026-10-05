/**
 * Minimal markdown renderer for info drawers.
 * Supports: # ## ### headings, paragraphs, "- " lists, [label](url) links,
 * a standalone price line such as €35.00, and collapsible sections:
 *
 * <details>
 * <summary>Title</summary>
 *
 * - Item
 * </details>
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
          className="os-markdown-a os-link"
          {...(href.toLowerCase().startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {match[1]}
        </a>,
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

function renderBlock(block, key) {
  const line = block.trim();
  const lines = line.split("\n");

  if (lines.every((item) => item.trim().startsWith("- "))) {
    return (
      <ul key={key} className="os-markdown-ul">
        {lines.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item.trim().slice(2))}</li>
        ))}
      </ul>
    );
  }

  if (line.startsWith("### ")) {
    return (
      <h3 key={key} className="os-markdown-h3">
        {renderInline(line.slice(4))}
      </h3>
    );
  }

  if (line.startsWith("## ")) {
    return (
      <h2 key={key} className="os-markdown-h2">
        {renderInline(line.slice(3))}
      </h2>
    );
  }

  if (line.startsWith("# ")) {
    return (
      <h1 key={key} className="os-markdown-h1">
        {renderInline(line.slice(2))}
      </h1>
    );
  }

  if (PRICE_LINE.test(line)) {
    return (
      <p key={key} className="os-markdown-price">
        {line}
      </p>
    );
  }

  return (
    <p key={key} className="os-markdown-p">
      {lines.map((part, i) => (
        <span key={i}>
          {renderInline(part)}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

function parseSource(source) {
  const lines = source.replace(/\r\n/g, "\n").trim().split("\n");
  const blocks = [];
  let buffer = [];
  let details = null;

  function flushBuffer() {
    const text = buffer.join("\n").trim();
    buffer = [];
    if (text) blocks.push({ type: "block", text });
  }

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (details) {
      if (trimmed === "</details>") {
        blocks.push(details);
        details = null;
        return;
      }

      const summary = trimmed.match(/^<summary>(.*)<\/summary>$/);
      if (summary && !details.summary) {
        details.summary = summary[1];
        return;
      }

      details.body.push(line);
      return;
    }

    if (trimmed === "<details>") {
      flushBuffer();
      details = { type: "details", summary: "", body: [] };
      return;
    }

    if (trimmed === "") {
      flushBuffer();
      return;
    }

    buffer.push(line);
  });

  flushBuffer();
  return blocks;
}

export default function OsMarkdown({ source = "" }) {
  if (!source.trim()) {
    return <p className="os-empty">No info.</p>;
  }

  const blocks = parseSource(source);

  return (
    <div className="os-markdown">
      {blocks.map((block, index) => {
        if (block.type === "details") {
          const body = block.body.join("\n").trim();
          const inner = body
            ? body
                .split(/\n{2,}/)
                .filter((item) => item.trim())
                .map((item, itemIndex) => renderBlock(item, `${index}-${itemIndex}`))
            : null;

          return (
            <details key={index}>
              <summary>{block.summary}</summary>
              {inner}
            </details>
          );
        }

        return renderBlock(block.text, index);
      })}
    </div>
  );
}
