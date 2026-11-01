import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

test('Hero 9:16, camadas originais, tipografia e CTA', async ({ page }) => {
  await mkdir('.artifacts', { recursive: true });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' });
  for (const [width, height] of [[390, 844], [720, 1400], [1440, 980]]) {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const hero = page.locator('.crane-hero');
    const photo = page.locator('.hero-photograph').first();
    const foreground = page.locator('.hero-foreground');
    expect(await photo.getAttribute('src')).toEqual(await foreground.getAttribute('src'));
    await expect.poll(() => photo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 720)).toBe(true);
    const title = page.locator('#hero-title');
    await expect(title).toHaveCSS('font-weight', '800');
    await expect(title).toHaveCSS('font-family', 'Montserrat, sans-serif');
    await expect(page.locator('.hero-reference-description')).toHaveCSS('font-weight', '500');
    await expect(page.locator('.hero-quote-button')).toHaveCSS('font-weight', '700');
    expect(await hero.locator('.brand, .wordmark').count()).toBe(0);
    const rect = await hero.boundingBox();
    if (width < 768) expect(rect!.width / rect!.height).toBeCloseTo(9 / 16, 3);
    const mask = await foreground.evaluate(el => getComputedStyle(el).maskImage);
    expect(mask).toContain('guindaste-silhueta');
    await hero.screenshot({ path: `.artifacts/hero-${width}.png` });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('link', { name: 'Solicitar Cotação', exact: true }).click();
  await expect(page.locator('#cotacao')).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Cotar um seguro', exact: true })).toHaveAttribute('aria-pressed', 'true');
});

test('GSAP: entrada, rolagem reversível e retorno sem recomeçar', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'no-preference' });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect.poll(() => page.locator('.hero-title-entry').evaluate(el => Number(getComputedStyle(el).opacity)), { timeout: 10000 }).toBe(1);
  await expect(page.locator('.hero-title-entry')).toBeVisible();
  await expect.poll(() => page.locator('.hero-cta-entry').evaluate(el => Number(getComputedStyle(el).opacity))).toBe(1);
  await page.locator('#guindastes').scrollIntoViewIfNeeded();
  await expect(page.locator('.crane-content')).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => page.locator('.hero-title-depth').evaluate(el => getComputedStyle(el).transform), { timeout: 5000 }).toBe('matrix(1, 0, 0, 1, 0, 0)');
  await expect(page.locator('.hero-title-entry')).toHaveCSS('opacity', '1');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero-title-entry')).toHaveCSS('opacity', '1');
  expect(errors).toEqual([]);
});
