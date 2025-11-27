// Type definitions for the Life Insurance Product Tool

export type Language = 'en' | 'es';
export type Mode = 'quick' | 'guided';

export type Step =
  | 'language'
  | 'productType'
  | 'guidedQuestions'
  | 'summary'
  | 'build'
  | 'postBuildEdit';

export type Audience =
  | 'consumer'
  | 'agent'
  | 'internalTraining';

export type Tone = 'plain' | 'technical' | 'salesSupport';

// Supported product types for the builder. Each corresponds to a specific
// configuration structure defined in ProductConfig.
export type ProductType =
  | 'term'
  | 'wholeLife'
  | 'ul'
  | 'gul'
  | 'iul'
  | 'vul'
  | 'ivul'
  | 'finalExpense'
  | 'guaranteedIssue'
  | 'simplifiedIssue'
  | 'seniorTerm'
  | 'groupLife';

export interface UserSession {
  id: string;
  language: Language;
  mode: Mode;
  audience: Audience;
  tone: Tone;
  createdAt: string;
  updatedAt: string;
}

export interface BaseProductConfig {
  productType: ProductType | null;
  chassis?: string | null;
  funding?: string | null;
  payPeriod?: string | null;
  riders?: string[];
  livingBenefits?: 'builtIn' | 'optionalRider' | 'unavailable';
  loans?: string | null;
  deathBenefitOption?: string | null;
  allocations?: string | null;
  assumptions?: string | null;
}

export interface ProductConfig extends BaseProductConfig {
  term?: {
    length?: number;
    art?: boolean;
    rop?: boolean;
    conversion?: string | null;
  };
  wholeLife?: {
    participating?: boolean;
    dividendOption?: string | null;
    baseToPuaBlend?: string | null;
    limitedPay?: string | null;
    loanType?: string | null;
  };
  ul?: {
    currentAssumption?: boolean;
    secondaryGuarantee?: boolean;
    nlgPeriod?: string | null;
  };
  gul?: {
    guaranteeAgeTarget?: number | null;
    shadowAccount?: boolean;
    fundingPrecision?: string | null;
    catchUpRules?: string | null;
  };
  iul?: {
    chassis?: string | null;
    caps?: string | null;
    floors?: string | null;
    parRates?: string | null;
    creditingMethod?: string | null;
    fixedAllocation?: string | null;
    bonuses?: string | null;
    multipliers?: string | null;
    loanType?: string | null;
    overloanProtection?: boolean;
    limitedPay?: string | null;
  };
  vul?: {
    subaccounts?: string | null;
    glidepath?: string | null;
    rebalancing?: string | null;
    mAndERange?: string | null;
    fundExpenses?: string | null;
    dbOption?: string | null;
    loanType?: string | null;
    optionalNlg?: boolean;
  };
  ivul?: {
    indexBuckets?: string | null;
    variableSubaccounts?: string | null;
  };
  finalExpense?: {
    levelOrGraded?: string | null;
    waitingPeriod?: string | null;
    ageRange?: string | null;
  };
  simplifiedIssue?: {
    termLengths?: string | null;
    ageCaps?: string | null;
    conversion?: string | null;
  };
  groupLife?: {
    basicVsSupplemental?: string | null;
    ageBanding?: string | null;
    portability?: string | null;
    conversion?: string | null;
    eoi?: string | null;
  };
}

export interface OutputSections {
  productDefinition: string;
  premiumStructure: string;
  cashValueOrCoverageMechanics: string;
  deathBenefitOptions: string;
  costStructureAndFees: string;
  guaranteesAndRiskExposure: string;
  underwritingAndEligibility: string;
  suitabilityAndIdealClientProfile: string;
  policyLifecycle: string;
  benefits: string;
  drawbacksAndRisks: string;
  misconceptions: string;
  structuringStrategiesAndBestPractices: string;
  caseStudiesOrExampleDesigns: string;
  tablesAndComparisons: string;
  carrierAndRegulatoryPoints: string;
  livingBenefits: string | null;
  keyFormulasAndRatios: string;
  fieldTrainingTips: string;
  regulatoryAndDisclosureChecklist: string;
  finePrint: string;
}

export interface OutputDocument {
  id: string;
  userSessionId: string;
  productType: ProductType;
  config: ProductConfig;
  sections: OutputSections;
  createdAt: string;
  verifiedAt: string;
  updatedAt?: string;
  DISCLAIMERS?: string[];
  // We keep the name `disclaimers` lower-case in outputGenerator to avoid confusion,
  // but tests may still refer to this optional property.
  disclaimers?: string[];
}

export interface UploadedFile {
  name: string;
  type: string;
  parsedFields: Record<string, unknown>;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ConversationMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  meta?: {
    step?: Step;
  };
}