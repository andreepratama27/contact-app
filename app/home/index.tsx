import { getContact } from "@/services/contact.service";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
	Avatar,
	Button,
	Divider,
	Icon,
	Layout,
	List,
	ListItem,
	Text,
	TopNavigation,
} from "@ui-kitten/components";
import { RefreshControl } from "react-native";
import type { StackNavigation } from "../_layout";
import CreateContact from "../create-contact";
import Detail from "../detail";
import { useStore } from "zustand";
import { favoriteStore } from "@/store/favoriteStore";

const ListItemDivider = (props: Contact & { favorited: boolean }) => {
	const navigation = useNavigation<StackNavigation>();

	return (
		<ListItem
			title={[props.firstName, props.lastName].join(" ")}
			description={`Age: ${props.age}`}
			accessoryLeft={
				<Avatar
					src={props.photo}
					size="200px"
					shape="square"
					appearance="default"
				/>
			}
			accessoryRight={
				<Button appearance="ghost" size="medium">
					<Icon
						name={props.favorited ? "star" : "star-outline"}
						animation="zoom"
					/>
				</Button>
			}
			onPress={() =>
				navigation.navigate("Detail", {
					item: props,
				})
			}
		/>
	);
};

const HomeApp = ({ navigation }: NavigationProps) => {
	const useFavoriteStore = useStore(favoriteStore);
	const { data, refetch, isLoading } = useQuery({
		queryKey: ["get-contacts"],
		queryFn: getContact,
	});

	const isFavorited = (id: string): boolean => {
		return !!useFavoriteStore.contacts.find((item) => item.id === id);
	};

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation
				alignment="center"
				title={<Text>Jenius Contact App</Text>}
				accessoryRight={() => (
					<Button
						size="tiny"
						appearance="ghost"
						onPress={() => navigation.navigate("CreateContact")}
					>
						+ Create Contact
					</Button>
				)}
				style={{ paddingLeft: 14 }}
			/>
			<Divider />

			<List
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={refetch} />
				}
				data={data?.data}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => {
					return <ListItemDivider {...item} favorited={isFavorited(item.id)} />;
				}}
			/>
		</Layout>
	);
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Home() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Home"
				component={HomeApp}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="CreateContact"
				component={CreateContact}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Detail"
				component={Detail}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
