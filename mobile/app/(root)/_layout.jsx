import { Stack } from "expo-router/stack";
import SafeScreen from "@/components/SafeScreen";
import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Layout() {
  const{isSignedIn,isLoaded}= useUser()

  if(!isLoaded) return null //this
  if(!isSignedIn) return <Redirect href={"/sign-in"}/>
  return <Stack screenOptions={{ headerShown: false }} />;
}
