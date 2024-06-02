import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

/* UI-Kitten */
import * as eva from "@eva-design/eva";
import {
	ApplicationProvider,
	Icon,
	IconRegistry,
	Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

/* Router Setup */
import {
	NavigationContainer,
	type NavigationProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Linking from "expo-linking";

import Home from "./home";
import CreateContact from "./create-contact";
import Detail from "./detail";
import Favorite from "./favorite";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export type ScreenName = ["home", "create-contact", "detail"];
export type RootStackParamList = Record<ScreenName[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
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
						<Tab.Navigator backBehavior="initialRoute">
							<Tab.Screen
								name="home"
								component={Home}
								options={{
									headerShown: false,
									tabBarLabel: "Home",
									tabBarIcon: ({ color, size }) => (
										<MaterialCommunityIcons
											name="home"
											size={size}
											color={color}
										/>
									),
								}}
							/>

							<Tab.Screen
								name="favorite"
								component={Favorite}
								options={{
									headerShown: false,

									tabBarLabel: "Favorite",
									tabBarIcon: ({ color, size }) => (
										<MaterialCommunityIcons
											color={color}
											name="star"
											size={size}
										/>
									),
								}}
							/>
						</Tab.Navigator>
					</NavigationContainer>
				</QueryClientProvider>
			</ApplicationProvider>
		</SafeAreaView>
	);
}
