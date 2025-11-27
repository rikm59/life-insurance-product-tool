import {generateOutputDocument} from '@/lib/outputGenerator';
import {UserSession, ProductConfig} from '@/lib/types';

describe('generateOutputDocument', () => {
  it('includes living benefits for IUL', () => {
    const session: UserSession = {
      id: 'sess_1',
      language: 'en',
      mode: 'guided',
      audience: 'agent',
      tone: 'plain',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const config: ProductConfig = {
      productType: 'iul',
      livingBenefits: 'optionalRider',
      riders: [],
      iul: {
        chassis: 'accumulation',
        caps: '10%',
        floors: '0%',
        parRates: '100%',
        creditingMethod: 'Annual point-to-point',
        fixedAllocation: '20%',
        bonuses: '',
        multipliers: '',
        loanType: 'Indexed loan',
        overloanProtection: true,
        limitedPay: '20-pay'
      }
    };
    const doc = generateOutputDocument(session, 'iul', config);
    expect(doc.sections.livingBenefits).toContain('LIVING BENEFITS');
  });
});