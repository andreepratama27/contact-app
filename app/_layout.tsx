import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
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
		<ApplicationProvider {...eva} theme={eva.light}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(homepage)" />
				{/* <Stack.Screen name="create-contact" /> */}
			</Stack>
		</ApplicationProvider>
	);
}
