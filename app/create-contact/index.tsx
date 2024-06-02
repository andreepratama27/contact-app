import { Layout, Text, TopNavigation, Divider } from "@ui-kitten/components";
import { View } from "react-native";

export default function CreateContactPage() {
	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation title="Create Contact" />
			<Divider />

			<View style={{ padding: 20 }}>
				<Text>Create Contact</Text>
			</View>
		</Layout>
	);
}
