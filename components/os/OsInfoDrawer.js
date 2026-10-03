import OsMarkdown from "./OsMarkdown";

export default function OsInfoDrawer({ open, markdown }) {
  if (!open) return null;

  return (
    <aside className="os-drawer" aria-label="Info">
      <div className="os-drawer-header">
        <h4 className="os-drawer-title">Info</h4>
      </div>
      <div className="os-drawer-body">
        <OsMarkdown source={markdown} />
      </div>
    </aside>
  );
}
