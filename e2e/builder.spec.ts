import {test, expect} from '@playwright/test';

test('language then product type then guided prompts', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link', {name: /Builder/i}).click();
  await expect(page.getByText(/Start by telling me your preferred language/i)).toBeVisible();
  const input = page.getByPlaceholder(/Type your answer/i);
  await input.fill('English');
  await page.getByRole('button', {name: /Send/i}).click();
  await input.fill('IUL quick mode');
  await page.getByRole('button', {name: /Send/i}).click();
  await expect(page.getByText(/Step: guidedQuestions/i)).toBeVisible();
});