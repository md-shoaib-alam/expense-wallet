import { Stack } from "expo-router/stack";
import SafeScreen from "@/components/SafeScreen";

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
