import { getContact } from "@/services/contact.service";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import {
	Button,
	Divider,
	Layout,
	List,
	ListItem,
	Text,
	TopNavigation,
} from "@ui-kitten/components";
import { Link } from "expo-router";

const ListItemDivider = (props: Contact) => (
	<ListItem
		title={[props.firstName, props.lastName].join(" ")}
		description={`Age: ${props.age}`}
		// accessoryLeft={<Avatar src={props.photo} size="200px" appearance="round" />}
	/>
);

export default function Home({ navigation }: NavigationProps) {
	const { data } = useQuery({
		queryKey: ["get-contacts"],
		queryFn: getContact,
		refetchOnWindowFocus: "always",
		refetchOnMount: "always",
	});

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation
				title={<Text>Jenius Contact App</Text>}
				accessoryRight={() => (
					<Button
						size="tiny"
						appearance="ghost"
						onPress={() => navigation.navigate("create-contact")}
					>
						+ Create New Contact
					</Button>
				)}
				style={{ paddingLeft: 14 }}
			/>
			<Divider />

			<List
				data={data?.data}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => {
					return <ListItemDivider {...item} />;
				}}
			/>
		</Layout>
	);
}
