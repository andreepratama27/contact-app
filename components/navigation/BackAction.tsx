import { useNavigation } from "@react-navigation/native";
import {
	type IconElement,
	TopNavigationAction,
	Icon,
} from "@ui-kitten/components";

const BackIcon = (props: IconElement) => <Icon {...props} name="arrow-back" />;

const BackAction = () => {
	const navigation = useNavigation();
	return (
		<TopNavigationAction
			icon={BackIcon}
			onPress={() => navigation.navigate("home")}
		/>
	);
};

export { BackIcon, BackAction };
