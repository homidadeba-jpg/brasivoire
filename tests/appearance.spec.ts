import { test, expect } from '@playwright/test';

test('tema e fontes corretos antes da hidratação, inclusive ao atualizar', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  // O HTML deve ter a aparência correta mesmo antes do bundle React chegar.
  await page.route('**/assets/*.js', route => route.fulfill({ contentType: 'text/javascript', body: '' }));
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('.site-header')).toHaveCSS('background-color', 'rgb(16, 27, 45)');
    await expect(page.locator('.theme-icon-sun')).toBeVisible();
    await expect(page.locator('.theme-icon-moon')).toBeHidden();
    const fonts = await page.evaluate(() => ({
      preloads: [...document.querySelectorAll<HTMLLinkElement>('link[as="font"]')].map(link => link.href),
      faces: [...document.fonts].filter(face => face.family === 'Montserrat').map(face => face.display),
    }));
    expect(fonts.preloads).toHaveLength(5);
    expect(fonts.faces).toEqual(['block', 'block', 'block', 'block', 'block']);
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => document.fonts.check('800 24px Montserrat'))).toBe(true);
  await page.screenshot({ path: '.artifacts/appearance-before-hydration.png' });
  await page.unrouteAll({ behavior: 'wait' });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.reload();
  await expect(page.getByRole('button', { name: 'Ativar tema claro' })).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Ativar tema claro' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('.theme-icon-moon')).toBeVisible();
  await page.emulateMedia({ colorScheme: 'light' });
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByRole('button', { name: 'Ativar tema escuro' })).toBeVisible();
  await page.screenshot({ path: '.artifacts/appearance-light-loaded.png' });
  expect(errors).toEqual([]);
});
