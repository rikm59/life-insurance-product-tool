import {Step, ProductType, UserSession, ProductConfig} from './types';

export interface ConversationState {
  step: Step;
  session: UserSession | null;
  productConfig: ProductConfig;
  output: import('./types').OutputDocument | null;
}

/**
 * Returns the next step in the conversation flow based on the current
 * step. Once the build is complete, further interactions stay in
 * postBuildEdit until the session resets.
 */
export function nextStep(current: Step): Step {
  switch (current) {
    case 'language':
      return 'productType';
    case 'productType':
      return 'guidedQuestions';
    case 'guidedQuestions':
      return 'summary';
    case 'summary':
      return 'build';
    case 'build':
      return 'postBuildEdit';
    default:
      return 'postBuildEdit';
  }
}

/**
 * Determines whether living benefits are supported for a given product type.
 * This is used when generating the output document to conditionally include
 * the living benefits section.
 */
export function isLivingBenefitsSupported(productType: ProductType | null): boolean {
  if (!productType) return false;
  switch (productType) {
    case 'term':
    case 'wholeLife':
    case 'ul':
    case 'gul':
    case 'iul':
    case 'vul':
    case 'ivul':
    case 'finalExpense':
    case 'guaranteedIssue':
    case 'simplifiedIssue':
    case 'seniorTerm':
    case 'groupLife':
      return true;
    default:
      return false;
  }
}