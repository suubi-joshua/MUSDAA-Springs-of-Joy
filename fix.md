

# TASK 01: Fix Navigation Lifecycle, UI Bugs & Styling Architecture

## 1. Fix: Navigation "Back" Loop & Flow
* **Problem:** Pressing "Back" on the Home screen returns the user to the Splash screen, causing a freeze. `GetStarted.js` is also non-functional.
* **Requirement:** * Update `AppNavigator.tsx`. Once the loading/hydration state is complete, use `navigation.replace('GetStarted')` or `navigation.replace('Home')`. This clears the Splash screen from the stack history.
    * **Fix `GetStarted.js`:** Ensure this screen correctly navigates to the `Home` screen and that "Get Started" is functional.
    * Set the `Home` screen as the **initialRouteName** for the authenticated/main stack.

## 2. Fix: Splash Screen Visual Bug
* **Problem:** Redundant logos appearing; background color and transitions are inconsistent.
* **Requirement:** * Audit `app.json` and `SplashScreen.tsx`. Ensure only **one** logo source is active.
    * Update background color to the brand green: **#53B175**.
    * Use `SplashScreen.preventAutoHideAsync()` in the root file. Only call `SplashScreen.hideAsync()` once the app fonts, database, and assets are fully loaded to ensure a seamless fade-to-white transition.

## 3. Remove Authentication Layer
* **Requirement:** Completely delete `LoginPage.js` and any "forgot password" or "signup" screens.
* **Requirement:** Refactor `AppNavigator.tsx` to remove any conditional logic checking for a `userToken` or `isLoggedIn` state. The app must flow: **Splash → GetStarted → Home**.

## 4. Styling Modernization: Tailwind CSS (NativeWind)
* **Problem:** Inline styles and mixed CSS/JS files are cluttered and hard to maintain.
* **Requirement:** * Configure **NativeWind** (Tailwind CSS for React Native) as the primary styling engine.
    * **Refactor Strategy:** Convert all `StyleSheet.create()` objects and inline `style={{...}}` props into Tailwind utility classes using the `className` attribute.
    * **External CSS:** Do not create separate `.css` files. All styling should be handled via Tailwind classes directly in the `.js` or `.ts` components.
    * **Theme Config:** Ensure the Tailwind configuration includes the primary brand color:
        * `brand-green`: **#53B175**

## 5. Codebase Cleanup
* **Requirement:** Review all `.js` and `.ts` files to ensure they are clean, modular, and free of commented-out code from the previous login implementation.
* **Requirement:** Ensure `database.ts` is still called correctly during the transition from Splash to Home to ensure the hymnal data is ready for the user.

---