# 🎵 Springs of Joy Hymnal App

A modern, offline-first React Native hymnal application for MUSDAA (Makerere University Seventh-day Adventist Association). Built with Expo, TypeScript, and SQLite, featuring all 462 hymns from the Springs of Joy hymnal.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-Android-green)
![Language](https://img.shields.io/badge/language-TypeScript-3178c6)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

- ✅ **Complete Hymnal** - All 462 hymns with proper formatting
- ✅ **Offline First** - No internet required, everything stored locally
- ✅ **Fast Search** - Real-time search by title and lyrics (300ms debounce)
- ✅ **Bookmarks** - Save favorite hymns, persists across sessions
- ✅ **Customizable Display** - Adjustable font sizes
- ✅ **Share Hymns** - Built-in share via SMS, email, etc.
- ✅ **Professional Design** - MUSDAA branding with SDA green theme
- ✅ **Responsive UI** - Works on all Android device sizes
- ✅ **No Data Collection** - Private, local-only storage

---

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| **Framework** | React Native / Expo | 49.x |
| **Language** | TypeScript | Latest |
| **Navigation** | React Navigation | 7.x |
| **Database** | expo-sqlite | 55.x |
| **Storage** | AsyncStorage | 3.x |
| **Build System** | Expo EAS | Latest |
| **Target Platform** | Android | API 21+ |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 16+ and npm
- **Expo CLI**: `npm install -g eas-cli`
- **Expo Account**: Create free account at [expo.dev](https://expo.dev)

### Installation

```bash
# Clone or navigate to project
cd MUSDAA-Springs-of-Joy

# Install dependencies
npm install

# Start development server
npm start

# Press 'a' for Android preview in Expo Go
# Or scan QR code with your phone
```

### Development Commands

```bash
# Start Expo server (interactive menu)
npm start

# Run on connected Android device
npm run android

# Run on iOS (requires macOS)
npm run ios

# Run on web (limited functionality)
npm run web
```

---

## 📦 Building for Production

### Generate APK (Android)

**Step 1: Authenticate with Expo**
```bash
npm install -g eas-cli
eas login  # Use your Expo credentials
```

**Step 2: Build APK**
```bash
npm run build:android
```

**Step 3: Download & Install**
- Download `.apk` from Expo dashboard
- Install on Android device:
  ```bash
  adb install springs-of-joy-1.0.0.apk
  ```

### Detailed Build Instructions

See [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md) for comprehensive build guide.

---

## 📂 Project Structure

```
MUSDAA-Springs-of-Joy/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── HymnListItem.tsx     # List item component
│   │   └── SearchBar.tsx        # Search input component
│   │
│   ├── data/
│   │   └── hymns.ts             # All 462 hymns (auto-generated)
│   │
│   ├── db/
│   │   └── database.ts          # SQLite database operations
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useBookmarks.ts      # Bookmark management
│   │   ├── useHymns.ts          # Hymn data fetching
│   │   └── useSearch.ts         # Search functionality
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Navigation structure
│   │
│   ├── screens/                 # Screen components
│   │   ├── BookmarksScreen.tsx
│   │   ├── HymnDetailScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── SplashScreen.tsx
│   │
│   ├── theme/
│   │   └── index.ts             # Design system (colors, typography)
│   │
│   └── types.ts                 # TypeScript type definitions
│
├── App.js                        # Entry point
├── app.json                      # Expo configuration
├── eas.json                      # EAS build profiles
├── tsconfig.json                 # TypeScript config
├── package.json                  # Dependencies
└── README.md                     # This file
```

---

## 🎨 Design & Branding

### Color Palette
- **Primary**: SDA Green (`#005F3A`) - MUSDAA institutional color
- **Secondary**: Sandy Brown (`#F4A460`)
- **Background**: White (`#FFFFFF`)
- **Text**: Dark Grey (`#2C3E50`)

### Typography
- **Regular**: 16px (default)
- **Large**: 18px-20px (adjustable)
- **Small**: 12px-14px

### Responsive Design
- Optimized for all Android screen sizes
- Proper padding and spacing throughout
- Touch-friendly button sizes (minimum 44dp)

---

## 🔍 Key Functionality

### Home Screen
- Displays hymns 1-50 initially
- Infinite scroll to load more
- Each hymn shows number badge and title preview
- Tap to view full lyrics

### Search
- Live search as you type
- Searches both title and body text
- 300ms debounce to optimize performance
- Shows result count

### Hymn Detail View
- Full formatted lyrics with verse breaks
- Scrollable for long hymns
- **Font Controls**: Adjust text size with +/- buttons
- **Bookmark**: Save/unsave hymns
- **Share**: Share via available apps
- **Header**: Shows hymn title

### Bookmarks
- View all saved hymns
- Sorted by date added (newest first)
- Pull-to-refresh to reload
- Tap hymn to view full text

### Settings
- **Display Options**: Dark mode, large text
- **About**: App version, hymn count, organization
- **Help**: Tips, tricks, contact info
- **Privacy**: Local storage assurance

---

## 🧪 Testing Checklist

Before releasing or distributing:

- [ ] Splash screen shows for ~2.5 seconds
- [ ] All 462 hymns load correctly
- [ ] Search works for both titles and lyrics
- [ ] Font size adjustment works
- [ ] Bookmarks persist after app restart
- [ ] Share functionality works
- [ ] App works completely offline
- [ ] UI is responsive on different screen sizes
- [ ] No crashes during navigation
- [ ] Pull-to-refresh works on bookmarks tab

---

## 💡 Usage Examples

### Search for a hymn
1. Go to **Search tab**
2. Type hymn title or lyrics
3. Tap result to view full hymn

### Save a hymn
1. Open hymn detail view
2. Tap **bookmark icon** in header
3. Hymn saved to bookmarks

### Adjust font size
1. Open hymn detail view
2. Use **+** to increase or **-** to decrease
3. Changes apply immediately

### Share a hymn
1. Open hymn detail view
2. Tap **share icon** in header
3. Select app to share via

---

## 🔧 Maintenance

### Updating Hymn Data
If hymns need to be updated from the Java source:
Send through any changes you would like to see in SPrings of Joy, or hymns you would like to see in the springs of Joy

### Version Updates
1. Update `version` field in `app.json`
2. Rebuild APK: `npm run build:android`
3. Distribute new `.apk` file

---

## ⚡ Performance Optimization

- **Pagination**: Initial 50 hymns loaded, more on scroll
- **Search Debouncing**: 300ms delay prevents excessive queries
- **SQLite Indexing**: Primary keys indexed for fast lookups
- **Local Storage**: All data cached on device
- **Memory Management**: Efficient list rendering with FlatList

---

## 🐛 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall dependencies
npm start --clear
rm -rf node_modules
npm install
```

### Search not working
- Verify database initialized on first launch
- Check browser console for errors
- Ensure `src/data/hymns.ts` exists

### APK build fails
```bash
# Clear build cache and retry
eas build --platform android --profile production --clear
```

## 👥 Contributing

This project is open to MUSDAA developers. To contribute:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -am 'Add new feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

---

## 📋 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 📞 Support & Contact

For issues, questions, or feature requests:

- **Email**: ssebaanajoshua@gmail.com
- **Organization**: MUSDAA (Makerere University Seventh-day Adventist Association)

---

## 🙏 Acknowledgments

- Original Java source: `SpringsOfJoy` Android project
- Hymns: Springs of Joy Hymnal
- Built for MUSDAA community

---

## 📈 Project Statistics

- **Hymns**: 462
- **TypeScript Files**: 16
- **Lines of Code**: ~14,500
- **Build Size**: ~40 MB (APK)
- **Minimum Android**: API 21+
- **App Version**: 1.0.0

---

**Built with ❤️ for MUSDAA**  
