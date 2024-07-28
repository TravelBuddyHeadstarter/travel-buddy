import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthContextProvider, useAuth } from '@/context/authContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const {isAuthenticated} = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(()=> {
    // chekc if user is authenticated
    if (typeof isAuthenticated=== 'undefined') return;
    const inApp = segments[0] === '(tabs)'
    if (isAuthenticated && !inApp) {
      //redirect to home
      router.replace('dashboard')
    } else if (!isAuthenticated) {
      //redirect to signin
      router.replace('login')
    }
  }, [isAuthenticated])

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="login" options={{ headerShown: false }}/>
          {/* <Stack.Screen name="index" options={{ headerShown: false }}/> */}
        </Stack>
      </ThemeProvider>
  )
}


export default function RootLayout() {
  

  return (
    <AuthContextProvider>
      <MainLayout/>
    </AuthContextProvider>
  );
}
