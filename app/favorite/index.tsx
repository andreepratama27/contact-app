import { BackAction } from "@/components/navigation/BackAction";
import { favoriteStore } from "@/store/favoriteStore";
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
import { useStore } from "zustand";

const ListItemDivider = (
	props: Contact & { onPress: (id: string) => void },
) => {
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
				<Button
					status="danger"
					size="tiny"
					accessoryLeft={<Icon name="trash" />}
					onPress={() => props.onPress(props.id)}
				/>
			}
		/>
	);
};

export default function Favorite() {
	const useFavoriteStore = useStore(favoriteStore);
	const handleDeleteItem = (id: string) => {
		useFavoriteStore.removeFavorite(id);
	};

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation alignment="center" title={<Text>Favorite</Text>} />
			<Divider />

			<List
				data={useFavoriteStore.contacts}
				ItemSeparatorComponent={Divider}
				renderItem={({ item }) => {
					return <ListItemDivider {...item} onPress={handleDeleteItem} />;
				}}
			/>
		</Layout>
	);
}
