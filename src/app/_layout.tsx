import { Stack } from "expo-router";
import { AppDataProvider } from "../hooks/useAppData";

export default function RootLayout() {
  return (
    <AppDataProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AppDataProvider>
  );
}
