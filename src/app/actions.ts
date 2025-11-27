'use server';

import {z} from 'zod';
import {generateOutputDocument} from '@/lib/outputGenerator';
import {
  UserSession,
  ProductConfig,
  OutputDocument,
  ProductType
} from '@/lib/types';
import {analyzeIllustration, AuditFindings} from '@/lib/auditAnalyzer';
import examples from '@/data/examples.json';

// Schema for validating generation input. Accepts arbitrary session, productType,
// and config objects that comply with our TypeScript definitions.
const generateSchema = z.object({
  session: z.custom<UserSession>(),
  productType: z.string(),
  config: z.custom<ProductConfig>()
});

/**
 * Server action for generating a tool document. Validates input with Zod and
 * then delegates to the output generator.
 */
export async function generateToolAction(input: unknown): Promise<OutputDocument> {
  const parsed = generateSchema.parse(input);
  const productType = parsed.productType as ProductType;
  return generateOutputDocument(parsed.session, productType, parsed.config);
}

/**
 * Server action for auditing a sample illustration. Uses the seed data from
 * examples.json to demonstrate the risk analysis. In a full implementation,
 * you would parse a real uploaded PDF.
 */
export async function auditSampleAction(): Promise<AuditFindings> {
  const parsed = examples.auditSample.parsedFields;
  return analyzeIllustration(parsed);
}