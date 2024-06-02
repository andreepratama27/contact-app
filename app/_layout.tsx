import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import * as eva from "@eva-design/eva";
import { ApplicationProvider, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import Home from "./home";
import CreateContact from "./create-contact";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

export default function RootLayout() {
	useReactQueryDevTools(queryClient);

	const [loaded] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	});

	const linking = {
		prefixes: [prefix],
	};

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
			<QueryClientProvider client={queryClient}>
				<NavigationContainer
					independent
					linking={linking}
					fallback={<Text>Loading Screen...</Text>}
				>
					<Stack.Navigator>
						<Stack.Screen
							name="home"
							component={Home}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="create-contact"
							component={CreateContact}
							options={{ title: "Create Contact" }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</QueryClientProvider>
		</ApplicationProvider>
	);
}
