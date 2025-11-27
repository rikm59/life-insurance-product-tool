import examples from '@/data/examples.json';

/**
 * Compare page displays a simple side-by-side view of example product
 * configurations. In a full implementation, this would allow users to
 * choose which designs to compare and generate a narrative analysis.
 */
export default function ComparePage() {
  const configs = [
    examples.iulExample,
    examples.wholeLifeExample,
    examples.termExample
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 text-xs">
      <h1 className="text-lg font-semibold">Compare Mode</h1>
      <p className="mt-1 text-slate-300">
        Select two or three product designs for side-by-side review.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {configs.map((c, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-slate-800 bg-slate-900/80 p-3"
          >
            <h2 className="text-sm font-semibold">
              {c.productType.toUpperCase()}
            </h2>
            <pre className="mt-2 whitespace-pre-wrap text-[11px] text-slate-300">
              {JSON.stringify(c.config, null, 2)}
            </pre>
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/90 p-3">
        <h2 className="text-sm font-semibold">Narrative analysis</h2>
        <p className="mt-1 text-slate-300">
          IUL leans toward flexible accumulation with index crediting. Whole life
          leans toward guarantees and level premiums. Term keeps pure coverage
          with conversion potential. Use this view to discuss tradeoffs in risk,
          guarantees, and funding discipline.
        </p>
      </div>
    </div>
  );
}