import {UploadedFile} from './types';

export interface AuditFindings {
  underfundingRisk: 'low' | 'medium' | 'high';
  mecRisk: 'low' | 'medium' | 'high';
  lapseRisk: 'low' | 'medium' | 'high';
  notes: string[];
}

/**
 * Analyzes parsed illustration fields from an uploaded file to produce
 * qualitative risk assessments for underfunding, MEC risk, and lapse risk.
 * Additional notes are gathered based on simple rules for demonstration.
 */
export function analyzeIllustration(parsed: UploadedFile['parsedFields']): AuditFindings {
  const premiumToFace = Number(parsed['annualPremiumUsd'] || 0) / Number(parsed['faceAmountUsd'] || 1);
  const hasLoans = Boolean(parsed['loansPlanned']);
  const guidelineRatio = Number(parsed['plannedPremiumToGuideline'] || 0);

  const notes: string[] = [];

  let underfundingRisk: AuditFindings['underfundingRisk'] = 'medium';
  if (guidelineRatio < 0.6) {
    underfundingRisk = 'high';
    notes.push('Planned funding is far below guideline premium.');
  } else if (guidelineRatio > 0.9) {
    underfundingRisk = 'low';
    notes.push('Planned funding is close to guideline premium.');
  }

  let mecRisk: AuditFindings['mecRisk'] = 'medium';
  if (guidelineRatio > 1) {
    mecRisk = 'high';
    notes.push('MEC proximity above 1.0. Review funding pattern.');
  } else if (guidelineRatio < 0.7) {
    mecRisk = 'low';
    notes.push('MEC proximity low with current funding.');
  }

  let lapseRisk: AuditFindings['lapseRisk'] = 'medium';
  if (hasLoans && guidelineRatio < 0.8) {
    lapseRisk = 'high';
    notes.push('Loans plus light funding increase lapse risk.');
  } else if (!hasLoans && guidelineRatio >= 0.9) {
    lapseRisk = 'low';
    notes.push('Strong funding with no planned loans lowers lapse risk.');
  }

  if (premiumToFace < 0.01) {
    notes.push('Premium per USD of coverage looks thin for permanent design.');
  }

  return {
    underfundingRisk,
    mecRisk,
    lapseRisk,
    notes
  };
}