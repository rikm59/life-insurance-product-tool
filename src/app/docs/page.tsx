/**
 * Docs page outlines how to use the builder and clarifies key concepts. It
 * serves as a glossary and help section for the user.
 */
export default function DocsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-6 text-sm">
      <h1 className="text-lg font-semibold">Docs and glossary</h1>
      <p className="mt-2 text-slate-300">
        The builder supports English and Spanish, multiple product chassis, and
        two modes.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-xs text-slate-200">
        <li>Quick mode asks for product type, funding intent, and audience, then builds.</li>
        <li>Guided mode walks through premium, riders, loans, and allocations with defaults.</li>
        <li>Every section in the output document is editable without new generation.</li>
        <li>Living benefits appear only when supported for the chosen chassis.</li>
      </ul>
    </div>
  );
}