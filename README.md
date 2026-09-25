# Study Planner

A mobile app for keeping track of study tasks and deadlines across subjects.

Study Planner helps students see what's due, when, and for which course — all in one place.

## Features

- Add subjects and see them as a folder grid
- Add tasks with a title, deadline and an optional subject
- Mark tasks as done with a checkbox
- Home screen with a greeting and your next upcoming deadlines
- Per-subject screen with its tasks and a progress summary
- Overdue deadlines are highlighted in red
- Confirmation message when a task or subject is added
- Data is saved locally on the device between sessions


## Tech stack

- [Expo](https://expo.dev) / React Native with TypeScript
- [Expo Router](https://docs.expo.dev/router/introduction/) for file-based navigation
- AsyncStorage for local storage
- expo-checkbox, @react-native-community/datetimepicker, @expo/vector-icons, react-native-reanimated

## Getting started

Requires [Node.js](https://nodejs.org) and either the [Expo Go](https://expo.dev/go) app on your phone or an iOS simulator / Android emulator.

```bash
git clone https://github.com/eirinhi/study_planner.git
cd study_planner
npm install
npx expo start
```

Scan the QR code in the terminal to open the iOS simulator or Android emulator.

## Project structure

```
src/
├── app/          Screens and navigation (Expo Router)
├── components/   Reusable UI components (forms, task list, toast)
├── hooks/        App state (subjects and tasks)
├── storage/      Reading and writing data with AsyncStorage
├── types/        TypeScript types
└── theme.ts      Colors, spacing, typography and shared styles
```


## Future plans

- User accounts and authentication – allow multiple users, each with their own private data, instead of a single local dataset
- Backend/database storage – move from local AsyncStorage to a proper backend (e.g. the NestJS + Prisma + Supabase setup), enabling data sync across devices
- Task tags/categories – let users tag tasks (e.g. "exam", "assignment", "reading") to filter and organize beyond just subject
- Push notifications/reminders – notify users before a deadline
- Recurring tasks – support tasks that repeat weekly (e.g. weekly reading assignments)
- Calendar view – visualize tasks on a calendar instead of just a list
- Dark mode support
- Calendar integration – add tasks directly to the device's calendar (or sync with Google Calendar) so deadlines show up alongside other commitments
- Study statistics – simple stats on completed vs. pending tasks, or tasks per subject, to visualize workload