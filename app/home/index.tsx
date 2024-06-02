import { getContact } from "@/services/contact.service";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { FlatList, RefreshControl, ScrollView } from "react-native";
import type { StackNavigation } from "../_layout";

const ListItemDivider = (props: Contact) => {
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
					<Icon name="star-outline" animation="zoom" />
				</Button>
			}
			onPress={() =>
				navigation.navigate("detail-contact", {
					item: props,
				})
			}
		/>
	);
};

export default function Home({ navigation }: NavigationProps) {
	const { data, refetch, isLoading } = useQuery({
		queryKey: ["get-contacts"],
		queryFn: getContact,
	});

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation
				alignment="center"
				title={<Text>Jenius Contact App</Text>}
				accessoryRight={() => (
					<Button
						size="tiny"
						appearance="ghost"
						onPress={() => navigation.navigate("create-contact")}
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
					return <ListItemDivider {...item} />;
				}}
			/>
		</Layout>
	);
}
