import {OutputDocument, ProductConfig, ProductType, OutputSections, UserSession} from './types';
import {isLivingBenefitsSupported} from './stateMachine';

/**
 * Helper to create a consistent uppercase header for each section of the output.
 */
function baseSectionHeader(title: string): string {
  return title.toUpperCase();
}

/**
 * Generates the entire output document based on the session, product type and
 * configuration. Each section is seeded with a template that can be later
 * customized or edited by the user. A unique id and timestamps are added.
 */
export function generateOutputDocument(
  session: UserSession,
  productType: ProductType,
  config: ProductConfig
): OutputDocument {
  const now = new Date().toISOString();
  const sections: OutputSections = {
    productDefinition: `${baseSectionHeader('Product definition')}\n\nProduct type: ${productType}`,
    premiumStructure: `${baseSectionHeader('Premium structure')}\n\nDescribe premium mode, funding pattern, and pay period.`,
    cashValueOrCoverageMechanics: `${baseSectionHeader('Cash value or coverage mechanics')}\n\nExplain growth, crediting, and guarantees.`,
    deathBenefitOptions: `${baseSectionHeader('Death benefit options')}\n\nSummarize level vs increasing and switches.`,
    costStructureAndFees: `${baseSectionHeader('Cost structure and fees')}\n\nDescribe COI, policy fees, riders, and loads.`,
    guaranteesAndRiskExposure: `${baseSectionHeader('Guarantees and risk exposure')}\n\nSeparate guaranteed values from non-guaranteed projections.`,
    underwritingAndEligibility: `${baseSectionHeader('Underwriting and eligibility')}\n\nSummarize age ranges, classes, and simplified vs full underwriting.`,
    suitabilityAndIdealClientProfile: `${baseSectionHeader('Suitability and ideal client profile')}\n\nDescribe ideal age, income, objectives, and risk tolerance.`,
    policyLifecycle: `${baseSectionHeader('Policy lifecycle')}\n\nCover issue, funding, reviews, distributions, and exit paths.`,
    benefits: `${baseSectionHeader('Benefits')}\n\nList practical benefits in plain language.`,
    drawbacksAndRisks: `${baseSectionHeader('Drawbacks and risks')}\n\nHighlight funding risk, lapse risk, and complexity.`,
    misconceptions: `${baseSectionHeader('Misconceptions')}\n\nCall out common myths for this product design.`,
    structuringStrategiesAndBestPractices: `${baseSectionHeader('Structuring strategies and best practices')}\n\nShow pay patterns, death benefit options, and review habits that support success.`,
    caseStudiesOrExampleDesigns: `${baseSectionHeader('Case studies or example designs')}\n\nProvide at least two numeric examples in USD for typical clients.`,
    tablesAndComparisons: `${baseSectionHeader('Tables and comparisons')}\n\nInclude tables for premium vs death benefit, cash value vs loan, and guarantee vs projection.`,
    carrierAndRegulatoryPoints: `${baseSectionHeader('Carrier and regulatory points')}\n\nSummarize carrier rules, state variations, and replacement requirements.`,
    livingBenefits: isLivingBenefitsSupported(productType)
      ? `${baseSectionHeader('Living benefits')}\n\nLabel each benefit as built-in, optional rider, or unavailable for this configuration. Include triggers, definitions, claim mechanics, costs, tax treatment, and suitability notes.`
      : null,
    keyFormulasAndRatios: `${baseSectionHeader('Key formulas and ratios')}\n\nInclude guideline premium, MEC testing ratios, loan-to-cash-value limits, and funding ratios.`,
    fieldTrainingTips: `${baseSectionHeader('Field training tips')}\n\nGive talk tracks, whiteboard sketches, and questions to uncover fit.`,
    regulatoryAndDisclosureChecklist: `${baseSectionHeader('Regulatory and disclosure checklist')}\n\nList must-have disclosures, signed forms, replacement steps, and documentation.`,
    finePrint: `${baseSectionHeader('Fine print and hidden provisions')}\n\nExpose surrender schedules, policy charges, loan provisions, overloan behavior, rate change rights, and rider terminations. Separate guaranteed, non-guaranteed, and conditional items.`
  };

  const disclaimers = [
    'All figures are for training and design support, not a carrier quote.',
    'Use official carrier software for any client-facing illustration.',
    'Values in USD, rounded for clarity.'
  ];

  return {
    id: `out_${Date.now()}`,
    userSessionId: session.id,
    productType,
    config,
    sections,
    createdAt: now,
    verifiedAt: now,
    updatedAt: now,
    DISCLAIMERS: undefined,
    disclaimers
  };
}

/**
 * Updates a single section of an existing output document. The updatedAt
 * timestamp is refreshed. If a section value is null, it will remain null
 * in the updated document.
 */
export function updateOutputSection(
  doc: OutputDocument,
  key: keyof OutputSections,
  value: string | null
): OutputDocument {
  return {
    ...doc,
    sections: {
      ...doc.sections,
      [key]: value
    },
    updatedAt: new Date().toISOString()
  };
}