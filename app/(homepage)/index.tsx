import { getContact } from "@/services/contact.service";
import { useQuery } from "@tanstack/react-query";
import {
	Avatar,
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

export default function HomepageScreen() {
	const { data } = useQuery({
		queryKey: ["get-contacts"],
		queryFn: getContact,
	});

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation
				title={<Text>Jenius Contact App</Text>}
				accessoryRight={() => (
					<Link href="/create-contact" asChild>
						<Button size="tiny" appearance="ghost">
							+ Create New Contact
						</Button>
					</Link>
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
