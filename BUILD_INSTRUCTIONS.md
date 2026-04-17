# Springs of Joy Hymnal App

A modern React Native hymnal application for MUSDAA (Makerere University Seventh-day Adventist Association) with all 462 hymns from the Springs of Joy hymnal.

## Features

- ✅ **All 462 Hymns** - Complete hymnal database
- ✅ **Fast Search** - Search by title and lyrics
- ✅ **Bookmarks** - Save your favorite hymns
- ✅ **Customizable Display** - Adjustable font sizes and themes
- ✅ **Offline First** - All hymns stored locally on device
- ✅ **MUSDAA Branding** - Beautiful UI with institutional colors

## Tech Stack

- **React Native** with **Expo** (managed workflow)
- **TypeScript** for type safety
- **expo-sqlite** for local storage
- **React Navigation** for routing
- **Expo Build Service** for APK generation

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── HymnListItem.tsx
│   └── SearchBar.tsx
├── data/
│   └── hymns.ts        # All 462 hymns (auto-generated)
├── db/
│   └── database.ts     # SQLite database layer
├── hooks/
│   ├── useBookmarks.ts
│   ├── useHymns.ts
│   └── useSearch.ts
├── navigation/
│   └── AppNavigator.tsx # Navigation structure
├── screens/
│   ├── BookmarksScreen.tsx
│   ├── HymnDetailScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SearchScreen.tsx
│   ├── SettingsScreen.tsx
│   └── SplashScreen.tsx
├── theme/
│   └── index.ts        # Colors, typography, spacing
└── types.ts            # TypeScript type definitions
```

## Setup Instructions

### 1. Prerequisites

- Node.js 16+ and npm/yarn
- Expo CLI: `npm install -g eas-cli`
- Android SDK (for APK builds)

### 2. Installation

```bash
cd MUSDAA-Springs-of-Joy
npm install
```

### 3. Development

**Run on local machine (Expo Go):**

```bash
npm start
# Then press 'a' for Android or 'i' for iOS
```

**Run on physical device:**

```bash
npm run android  # Android device
npm run ios      # iOS device
```

## Building the APK

### Prerequisites

- Expo account: https://expo.dev
- Authenticated with EAS: `eas login`

### Build Command

```bash
# Production APK build
npm run build:android

# Or using EAS CLI directly:
eas build --platform android --profile production
```

### Output

- APK file will be available at Expo dashboard or locally
- Side-load onto Android devices using Android Studio or adb:
  ```bash
  adb install springs-of-joy-1.0.0.apk
  ```

## Features in Detail

### Home Screen

- Browse all 462 hymns
- View hymn titles and first line preview
- Infinite scroll with pagination
- Tap to open full lyrics

### Search

- Real-time search by title or lyrics (300ms debounce)
- Displays all matching results instantly
- Clear search with one tap

### Bookmarks

- Save hymns as favorites
- Persists across app restarts
- Pull-to-refresh to reload
- Tap to view full hymn

### Detail View

- Full hymn lyrics with preserved formatting
- Hymn title in header
- **Font Size Controls** - Adjust font size with +/- buttons
- **Bookmark** - Save/unsave with icon button
- **Share** - Share hymn via SMS, email, etc.
- Scrollable for long hymns

### Settings

- **Dark Mode** - Toggle dark theme (feature-ready)
- **Large Text** - Default large font option
- **About** - Version and hymn count info
- **Help** - Tips, tricks, and contact info
- **Privacy** - Local storage assurance

## Data

All hymn data is:

- **Extracted from** Java source: `SpringsOfJoy/app/src/main/java/.../MyList.java`
- **Stored locally** in SQLite database for offline access
- **Seeded automatically** on first app launch
- **No external network required** - completely self-contained

## Configuration

### app.json

- App name, version, and package IDs
- Android and iOS settings
- Splash screen configuration
- EAS build integration

### eas.json

- Build profiles (production, development)
- Android APK settings
- Expo Cloud build targets

## Troubleshooting

### App won't start

1. Clear cache: `npm start --clear`
2. Delete node_modules: `rm -rf node_modules && npm install`
3. Check Expo version: `expo --version`

### Search not working

- Ensure database is seeded on first launch
- Check browser console for errors
- Verify hymn data in `src/data/hymns.ts`

### APK build fails

- Verify in `eas.json` build profile
- Check internet connection
- Ensure EAS authentication: `eas login`
- Run: `eas build --platform android --profile production --clear`

## Maintenance

### Updating hymns

1. Modify `SpringsOfJoy/app/src/main/java/.../MyList.java`
2. Run hymn extraction:
   ```bash
   python3 extract-hymns-v3.py
   ```
3. Verify new `src/data/hymns.ts`

### Version updates

1. Update `version` in `app.json`
2. Rebuild APK with `eas build`
3. Distribute new `.apk` file

## Performance

- **Initial Load**: ~2.5s (splash screen)
- **Search**: <300ms debounced
- **Font Size Adjustment**: Instant
- **Bookmark Operations**: <100ms
- **Memory Usage**: ~30-50MB

## License

Built for MUSDAA © 2024

## Support

For issues, questions, or feature requests:

- Email: ssebaanajoshua@gmail.com
- Contact: MUSDAA Administration

---

**Last Updated**: April 2024
**Hymn Count**: 462
**App Version**: 1.0.0
