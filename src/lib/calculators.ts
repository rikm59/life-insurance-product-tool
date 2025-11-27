/**
 * Calculates the guideline premium based on face amount and a factor. Returns
 * the guideline premium in USD.
 */
export function guidelinePremium(faceAmountUsd: number, factor: number): number {
  return faceAmountUsd * factor;
}

/**
 * Calculates the proximity of a planned premium to the guideline premium. A
 * value near 1.0 indicates the planned premium is close to the guideline. Values
 * above 1.0 increase the risk of creating a Modified Endowment Contract (MEC).
 */
export function mecProximity(
  guidelinePremiumUsd: number,
  plannedPremiumUsd: number
): number {
  if (guidelinePremiumUsd <= 0) return 0;
  return plannedPremiumUsd / guidelinePremiumUsd;
}

/**
 * Runs a simple loan stress test over a number of years given an initial
 * cash value, a loan interest rate, and a crediting rate. Returns the
 * remaining value and whether the value has been depleted.
 */
export function loanStressTest(
  cashValueUsd: number,
  loanRate: number,
  creditingRate: number,
  years: number
): {remainingValue: number; warning: boolean} {
  let value = cashValueUsd;
  for (let i = 0; i < years; i += 1) {
    value = value * (1 + creditingRate) - value * loanRate;
  }
  const warning = value <= 0;
  return {remainingValue: value, warning};
}