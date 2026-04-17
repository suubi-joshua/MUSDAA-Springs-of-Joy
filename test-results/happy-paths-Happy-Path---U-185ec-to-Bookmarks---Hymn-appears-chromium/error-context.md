# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: happy-paths.spec.ts >> Happy Path - User Journeys >> Scenario 3: Bookmarking >> User bookmarks a hymn -> Navigates to Bookmarks -> Hymn appears
- Location: e2e/happy-paths.spec.ts:121:9

# Error details

```
TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="hymn-item"]') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]: "{\"id\":\"ba81c056-344d-4eb2-aa40-6f7febd72462\",\"createdAt\":\"2026-04-17T14:30:00.677Z\",\"runtimeVersion\":\"exposdk:54.0.0\",\"launchAsset\":{\"key\":\"bundle\",\"contentType\":\"application/javascript\",\"url\":\"http://127.0.0.1:8081/node_modules/expo/AppEntry.bundle?platform=ios&dev=true&hot=false&lazy=true&transform.engine=hermes&transform.bytecode=1&transform.routerRoot=app&unstable_transformProfile=hermes-stable\"},\"assets\":[],\"metadata\":{},\"extra\":{\"eas\":{},\"expoClient\":{\"name\":\"Springs of Joy\",\"slug\":\"springs-of-joy\",\"version\":\"1.0.0\",\"orientation\":\"portrait\",\"userInterfaceStyle\":\"light\",\"splash\":{\"image\":\"./assets/StartupImage.png\",\"resizeMode\":\"contain\",\"backgroundColor\":\"#53B175\",\"imageUrl\":\"http://127.0.0.1:8081/assets/./assets/StartupImage.png\"},\"assetBundlePatterns\":[\"**/*\"],\"ios\":{\"supportsTablet\":true,\"bundleIdentifier\":\"com.musdaa.springsoffoy\"},\"android\":{\"backgroundColor\":\"#53B175\",\"package\":\"com.musdaa.springsofjoyhymnal\"},\"web\":{\"favicon\":\"./assets/Logo-Components.png\"},\"_internal\":{\"isDebug\":false,\"projectRoot\":\"/home/suubi7/springs_of_joy/MUSDAA-Springs-of-Joy\",\"dynamicConfigPath\":null,\"staticConfigPath\":\"/home/suubi7/springs_of_joy/MUSDAA-Springs-of-Joy/app.json\",\"packageJsonPath\":\"/home/suubi7/springs_of_joy/MUSDAA-Springs-of-Joy/package.json\"},\"sdkVersion\":\"54.0.0\",\"platforms\":[\"ios\",\"android\",\"web\"],\"hostUri\":\"127.0.0.1:8081\"},\"expoGo\":{\"debuggerHost\":\"127.0.0.1:8081\",\"developer\":{\"tool\":\"expo-cli\",\"projectRoot\":\"/home/suubi7/springs_of_joy/MUSDAA-Springs-of-Joy\"},\"packagerOpts\":{\"dev\":true},\"mainModuleName\":\"node_modules/expo/AppEntry\"},\"scopeKey\":\"@anonymous/springs-of-joy-489ac8b4-0f5e-42ff-9d13-a3f9881b1af1\"}}"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test'
  2   | 
  3   | const BASE_URL = 'http://localhost:8081'
  4   | 
  5   | async function navigateToMainApp(page: any) {
  6   |   await page.goto(BASE_URL)
  7   | 
  8   |   // Wait for splash screen to complete (2.5s timeout + buffer)
  9   |   const getStartedButton = page.locator('text=Get Started')
  10  |   try {
  11  |     await getStartedButton.waitFor({ timeout: 5000 })
  12  |     await getStartedButton.click()
  13  |   } catch {
  14  |     // Already past splash screen
  15  |   }
  16  | 
  17  |   // Wait for the home tab content to load
> 18  |   await page.waitForSelector('[data-testid="hymn-item"]', { timeout: 10000 })
      |              ^ TimeoutError: page.waitForSelector: Timeout 10000ms exceeded.
  19  | }
  20  | 
  21  | test.describe('Happy Path - User Journeys', () => {
  22  |   test.beforeEach(async ({ page }) => {
  23  |     await navigateToMainApp(page)
  24  |   })
  25  | 
  26  |   test.describe('Scenario 1: Discovery', () => {
  27  |     test('User opens app -> Sees hymn list -> Taps hymn -> Hymn detail opens', async ({ page }) => {
  28  |       const hymnItem = page.locator('[data-testid="hymn-item"]').first()
  29  |       await expect(hymnItem).toBeVisible()
  30  | 
  31  |       await hymnItem.click()
  32  | 
  33  |       await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })
  34  |       await expect(page.locator('[data-testid="hymn-title"]')).toBeVisible()
  35  |       await expect(page.locator('[data-testid="hymn-body"]')).toBeVisible()
  36  |     })
  37  | 
  38  |     test('User navigates back from hymn detail', async ({ page }) => {
  39  |       await page.locator('[data-testid="hymn-item"]').first().click()
  40  | 
  41  |       await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })
  42  | 
  43  |       const backButton = page.locator('[data-testid="back-button"]')
  44  |       await backButton.click()
  45  | 
  46  |       await expect(page.locator('[data-testid="hymn-item"]').first()).toBeVisible({
  47  |         timeout: 5000,
  48  |       })
  49  |     })
  50  |   })
  51  | 
  52  |   test.describe('Scenario 2: Customization (Type-Scale)', () => {
  53  |     test('User increases font size -> Text becomes larger', async ({ page }) => {
  54  |       await page.locator('[data-testid="hymn-item"]').first().click()
  55  | 
  56  |       await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })
  57  | 
  58  |       const typeScaleButton = page.locator('[data-testid="type-scale-button"]')
  59  |       await typeScaleButton.click()
  60  | 
  61  |       await page.waitForSelector('[data-testid="type-scale-control"]', { timeout: 5000 })
  62  | 
  63  |       const increaseButton = page.locator('[data-testid="increase-font"]')
  64  |       await increaseButton.click()
  65  | 
  66  |       const hymnBody = page.locator('[data-testid="hymn-body"]')
  67  |       const fontSizeBefore = await hymnBody.evaluate(el =>
  68  |         parseFloat(getComputedStyle(el).fontSize)
  69  |       )
  70  | 
  71  |       await increaseButton.click()
  72  | 
  73  |       const fontSizeAfter = await hymnBody.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
  74  |       expect(fontSizeAfter).toBeGreaterThan(fontSizeBefore)
  75  |     })
  76  | 
  77  |     test('User decreases font size -> Text becomes smaller', async ({ page }) => {
  78  |       await page.locator('[data-testid="hymn-item"]').first().click()
  79  | 
  80  |       await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })
  81  | 
  82  |       const typeScaleButton = page.locator('[data-testid="type-scale-button"]')
  83  |       await typeScaleButton.click()
  84  | 
  85  |       await page.waitForSelector('[data-testid="type-scale-control"]', { timeout: 5000 })
  86  | 
  87  |       const decreaseButton = page.locator('[data-testid="decrease-font"]')
  88  |       await decreaseButton.click()
  89  | 
  90  |       const hymnBody = page.locator('[data-testid="hymn-body"]')
  91  |       const fontSizeBefore = await hymnBody.evaluate(el =>
  92  |         parseFloat(getComputedStyle(el).fontSize)
  93  |       )
  94  | 
  95  |       await decreaseButton.click()
  96  | 
  97  |       const fontSizeAfter = await hymnBody.evaluate(el => parseFloat(getComputedStyle(el).fontSize))
  98  |       expect(fontSizeAfter).toBeLessThan(fontSizeBefore)
  99  |     })
  100 | 
  101 |     test('User closes type-scale control', async ({ page }) => {
  102 |       await page.locator('[data-testid="hymn-item"]').first().click()
  103 | 
  104 |       await page.waitForSelector('[data-testid="hymn-detail"]', { timeout: 5000 })
  105 | 
  106 |       const typeScaleButton = page.locator('[data-testid="type-scale-button"]')
  107 |       await typeScaleButton.click()
  108 | 
  109 |       await page.waitForSelector('[data-testid="type-scale-control"]', { timeout: 5000 })
  110 | 
  111 |       const closeButton = page.locator('[data-testid="close-type-scale"]')
  112 |       await closeButton.click()
  113 | 
  114 |       await expect(page.locator('[data-testid="type-scale-control"]')).not.toBeVisible({
  115 |         timeout: 5000,
  116 |       })
  117 |     })
  118 |   })
```