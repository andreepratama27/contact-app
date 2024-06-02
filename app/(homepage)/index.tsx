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
import { Link } from "expo-router";
import { View } from "react-native";

const ListItemDivider = () => (
	<ListItem
		title="Jenius Contact App"
		description="Small Description"
		accessoryLeft={
			<Avatar
				src="https://robohash.org/andreepratama27"
				size="200px"
				appearance=""
			/>
		}
	/>
);

export default function HomepageScreen() {
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
				data={new Array(10).fill("")}
				ItemSeparatorComponent={Divider}
				renderItem={() => <ListItemDivider />}
			/>
		</Layout>
	);
}
