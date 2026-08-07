export function calculate(type, inputs) {
  const engines = {
    currency: () => import("../calculators/finance/currency"),
    tax: () => import("../calculators/finance/tax"),
    gst: () => import("../calculators/finance/gst"),
    discount: () => import("../calculators/finance/discount"),
    emi: () => import("../calculators/finance/emi"),
    loan: () => import("../calculators/finance/loan"),
    compoundInterest: () => import("../calculators/finance/compoundInterest"),
    sip: () => import("../calculators/finance/sip")
  };

  const engine = engines[type];
  if (!engine) throw new Error(`Unknown finance calculator: ${type}`);
  return engine().then((mod) => mod.default(inputs));
}
