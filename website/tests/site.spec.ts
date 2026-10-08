import { expect, test } from '@playwright/test'

test.use({ baseURL: 'http://localhost:5173', channel: 'msedge' })

const routes = [
  ['/', 'הרב שלמה גרנית'],
  ['/lectures/', 'שיעורים והרצאות'],
  ['/weddings/', 'עריכת חופות'],
  ['/counseling-mediation/', 'ייעוץ וגישור'],
  ['/family-education/', 'שלום בית וחינוך'],
  ['/privacy/', 'פרטיות'],
  ['/accessibility/', 'נגישות'],
  ['/missing-page/', 'העמוד לא נמצא'],
]

test('האתר העברי מוצג במקום דוגמת Vite', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'he')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  await expect(page).toHaveTitle(/הרב שלמה גרנית/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(/הרב\s*שלמה גרנית/)
  await expect(page.getByText('Get started', { exact: true })).toHaveCount(0)
  await expect(page.locator('.service-grid > a')).toHaveCount(4)
  await expect(page.locator('i[data-lucide]')).toHaveCount(0)
  await expect(page.locator('#contact button:disabled')).toHaveCount(2)
  await expect(page.locator('a[href^="tel:"], a[href^="https://wa.me/"]')).toHaveCount(0)
  await expect.poll(() => page.locator('.hero-photo').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: testInfo.outputPath('desktop.png'), fullPage: true, animations: 'disabled' })
  expect(errors).toEqual([])
})

for (const width of [320, 390, 768, 1440]) {
  test(`העמודים נטענים ללא גלילה אופקית ברוחב ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const [route, heading] of routes) {
      await page.goto(route)
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(new RegExp(heading.replace('הרב ', 'הרב\\s*')))
      await page.evaluate(() => document.fonts.ready)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), route).toBe(true)
      await expect(page.locator('h1')).toHaveCount(1)
    }
  })
}

test('התפריט בנייד והשאלות הנפוצות פועלים עם מקלדת', async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect.poll(() => page.locator('.hero-photo').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true)
  await page.screenshot({ path: testInfo.outputPath('mobile.png'), fullPage: true, animations: 'disabled' })
  const menu = page.getByRole('button', { name: 'פתיחת תפריט' })
  await menu.click()
  await expect(page.locator('#main-nav')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await expect(menu).toBeFocused()
  await expect(page.locator('#main-nav')).not.toBeVisible()
  await menu.click()
  await page.locator('#main-nav').getByRole('link', { name: 'עריכת חופות' }).click()
  await expect(page).toHaveURL(/\/weddings\/$/)
  await expect(page.locator('#main-nav [aria-current="page"]')).toHaveText('עריכת חופות')
  const question = page.locator('summary').first()
  await question.focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('details').first()).toHaveAttribute('open', '')
  await page.keyboard.press('Enter')
  await expect(page.locator('details').first()).not.toHaveAttribute('open', '')
})