import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:8081'

async function navigateToMainApp(page: any) {
  await page.goto(BASE_URL)

  // Wait for splash screen to complete (2500ms timeout) or skip to GetStarted
  try {
    // Wait for Get Started button (appears after splash)
    await page.waitForSelector('text=Get Started', { timeout: 8000 })
    await page.click('text=Get Started')
  } catch {
    // If Get Started is not visible, try to find Home directly
    console.log('Get Started not visible, checking for Home content...')
  }

  // Wait for the home tab content to load
  try {
    await page.waitForSelector('[data-testid="hymn-item"]', { timeout: 15000 })
  } catch {
    // Take a screenshot for debugging
    console.log('Timeout waiting for hymn-item')
  }
}

test.describe('Happy Path - User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToMainApp(page)
  })

  test.describe('Scenario 1: Discovery', () => {
    test('User opens app -> Sees hymn list -> Taps hymn -> Hymn detail opens', async ({ page }) => {
      const hymnItem = page.locator('[data-testid="hymn-item"]').first()
      await expect(hymnItem).toBeVisible()

      await hymnItem.click()

      await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })
      await expect(page.locator('[data-testid="hymn-title"]')).toBeVisible()
      await expect(page.locator('[data-testid="hymn-body"]')).toBeVisible()
    })

    test('User navigates back from hymn detail', async ({ page }) => {
      await page.locator('[data-testid="hymn-item"]').first().click()

      await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })

      const backButton = page.locator('[data-testid="back-button"]')
      await backButton.click()

      await expect(page.locator('[data-testid="hymn-item"]').first()).toBeVisible({
        timeout: 5000,
      })
    })
  })

  test.describe('Scenario 2: Customization (Type-Scale)', () => {
    test('User increases font size -> Text becomes larger', async ({ page }) => {
      await page.locator('[data-testid="hymn-item"]').first().click()

      await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })

      const typeScaleButton = page.locator('[data-testid="type-scale-button"]')
      await typeScaleButton.click()

      await page.waitForSelector('[data-testid="type-scale-control"]', { timeout: 5000 })

      const increaseButton = page.locator('[data-testid="increase-font"]')
      await increaseButton.click()

      const hymnBody = page.locator('[data-testid="hymn-body"]')
      const fontSizeBefore = await hymnBody.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      )

      await increaseButton.click()

      const fontSizeAfter = await hymnBody.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
      expect(fontSizeAfter).toBeGreaterThan(fontSizeBefore)
    })

    test('User decreases font size -> Text becomes smaller', async ({ page }) => {
      await page.locator('[data-testid="hymn-item"]').first().click()

      await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })

      const typeScaleButton = page.locator('[data-testid="type-scale-button"]')
      await typeScaleButton.click()

      await page.waitForSelector('[data-testid="type-scale-control"]', { timeout: 5000 })

      const decreaseButton = page.locator('[data-testid="decrease-font"]')
      await decreaseButton.click()

      const hymnBody = page.locator('[data-testid="hymn-body"]')
      const fontSizeBefore = await hymnBody.evaluate(el =>
        parseFloat(getComputedStyle(el).fontSize)
      )

      await decreaseButton.click()

      const fontSizeAfter = await hymnBody.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
      expect(fontSizeAfter).toBeLessThan(fontSizeBefore)
    })

    test('User closes type-scale control', async ({ page }) => {
      await page.locator('[data-testid="hymn-item"]').first().click()

      await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })

      const typeScaleButton = page.locator('[data-testid="type-scale-button"]')
      await typeScaleButton.click()

      await page.waitForSelector('[data-testid="type-scale-control"]', { timeout: 5000 })

      const closeButton = page.locator('[data-testid="close-type-scale"]')
      await closeButton.click()

      await expect(page.locator('[data-testid="type-scale-control"]')).not.toBeVisible({
        timeout: 5000,
      })
    })
  })

  test.describe('Scenario 3: Bookmarking', () => {
    test('User bookmarks a hymn -> Navigates to Bookmarks -> Hymn appears', async ({ page }) => {
      const firstHymnTitle = await page
        .locator('[data-testid="hymn-item"] [data-testid="hymn-title"]')
        .first()
        .textContent()

      await page.locator('[data-testid="hymn-item"]').first().click()

      await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })

      const bookmarkButton = page.locator('[data-testid="bookmark-button"]')
      await bookmarkButton.click()

      // Go back to list
      const backButton = page.locator('[data-testid="back-button"]')
      await backButton.click()

      // Navigate to Bookmarks tab
      await page.locator('text=Bookmarks').click()

      await page.waitForSelector('[data-testid="bookmark-list"]', { timeout: 5000 })

      // Verify the bookmarked hymn appears
      const bookmarkedTitle = await page
        .locator('[data-testid="bookmark-item"] [data-testid="hymn-title"]')
        .first()
        .textContent()
      expect(bookmarkedTitle).toBe(firstHymnTitle)
    })
  })
})

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await navigateToMainApp(page)
  })

  test('User searches by hymn number -> Returns exact match', async ({ page }) => {
    // Navigate to Search tab
    await page.locator('text=Search').click()

    const searchInput = page.locator('[data-testid="search-input"]')
    await searchInput.waitFor({ timeout: 5000 })
    await searchInput.fill('1')

    await page.waitForSelector('[data-testid="search-results"]', { timeout: 5000 })

    const firstResult = page.locator('[data-testid="hymn-item"]').first()
    await expect(firstResult).toContainText('1', { timeout: 5000 })
  })

  test('User searches by title -> Returns matching results', async ({ page }) => {
    // Navigate to Search tab
    await page.locator('text=Search').click()

    const searchInput = page.locator('[data-testid="search-input"]')
    await searchInput.waitFor({ timeout: 5000 })
    await searchInput.fill('His')

    await page.waitForSelector('[data-testid="search-results"]', { timeout: 5000 })

    const results = page.locator('[data-testid="hymn-item"]')
    const count = await results.count()
    expect(count).toBeGreaterThan(0)

    for (let i = 0; i < Math.min(count, 5); i++) {
      await expect(results.nth(i)).toContainText(/his/i)
    }
  })

  test('User clears search -> Returns to full list', async ({ page }) => {
    // Navigate to Search tab
    await page.locator('text=Search').click()

    const searchInput = page.locator('[data-testid="search-input"]')
    await searchInput.waitFor({ timeout: 5000 })
    await searchInput.fill('test')

    await page.waitForSelector('[data-testid="search-results"]', { timeout: 5000 })

    const clearButton = page.locator('[data-testid="clear-search"]')
    await clearButton.click()

    await expect(searchInput).toHaveValue('')
  })
})
