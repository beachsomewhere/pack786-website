export default function AdminImportPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-bold text-trail-blue">Import Events from Google Sheets</h1>
      <p className="mt-2 text-sm text-trail-ink/70">
        1. In Google Sheets, use File → Download → Comma Separated Values (.csv).<br />
        2. Upload the file below.<br />
        3. Review the preview, fix anything that looks off, and choose Publish, Save as Draft, or Ignore
        for each row.
      </p>

      <form className="card mt-6 grid gap-4">
        <input type="file" accept=".csv" className="rounded-xl border border-trail-line p-3" />
        <button type="submit" className="btn-primary" disabled>
          Preview Import (not yet connected)
        </button>
      </form>

      <div className="mt-8 card bg-trail-blue/5 text-sm text-trail-ink/70">
        <p className="font-semibold text-trail-blue">How this will work once connected:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Parses each row using the column mapping in <code>scripts/import-events.ts</code></li>
          <li>Flags rows whose name + date closely match an existing event as possible duplicates</li>
          <li>Leaves any field blank in the sheet blank in the event record — nothing is invented</li>
          <li>Nothing is published until an admin explicitly approves it</li>
        </ul>
      </div>
    </div>
  );
}
