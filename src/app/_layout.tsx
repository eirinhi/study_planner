import { Stack } from "expo-router";
import { ToastProvider } from "../components/Toast";
import { AppDataProvider } from "../hooks/useAppData";

export default function RootLayout() {
  return (
    <ToastProvider>
      <AppDataProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </AppDataProvider>
    </ToastProvider>
  );
}
