import { BackAction } from "@/components/navigation/BackAction";
import {
	Button,
	Icon,
	Layout,
	Text,
	TopNavigation,
} from "@ui-kitten/components";
import { Image, View } from "react-native";

export default function Detail({ navigation, route }: NavigationProps) {
	const {
		params: { item },
	} = route;

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation
				accessoryLeft={BackAction}
				title={<Text>Detail Contact</Text>}
				accessoryRight={() => (
					<>
						<Button
							size="tiny"
							appearance="ghost"
							onPress={() => navigation.navigate("create-contact", { item })}
						>
							✏ Edit Contact️
						</Button>
					</>
				)}
			/>

			<View style={{ paddingTop: 14, paddingHorizontal: 20 }}>
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: 14,
					}}
				>
					<Image
						src={item.photo}
						style={{
							width: 100,
							height: 100,
							borderWidth: 1,
							borderRadius: 200,
						}}
					/>

					<View>
						<Text category="h5">
							{item.firstName} {item.lastName}
						</Text>
						<Text appearance="hint" category="h6">
							Age: {item.age}
						</Text>

						<Button
							size="tiny"
							style={{ marginTop: 14 }}
							accessoryLeft={(props) => <Icon {...props} name="star" />}
						>
							Set as Favorite
						</Button>
					</View>
				</View>
			</View>
		</Layout>
	);
}
