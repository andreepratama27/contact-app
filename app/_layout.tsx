import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

/* UI-Kitten */
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry, Text } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

/* Router Setup */
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Linking from "expo-linking";

import Home from "./home";
import CreateContact from "./create-contact";
import Detail from "./detail";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export type ScreenName = ["home", "create-contact", "detail"];
export type RootStackParamList = Record<ScreenName[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
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
		<SafeAreaView style={{ flex: 1 }}>
			<IconRegistry icons={EvaIconsPack} />
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
								options={{ headerShown: false }}
							/>
							<Stack.Screen
								name="detail-contact"
								component={Detail}
								options={{ headerShown: false }}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</QueryClientProvider>
			</ApplicationProvider>
		</SafeAreaView>
	);
}
