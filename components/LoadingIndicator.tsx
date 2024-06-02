import { Spinner } from "@ui-kitten/components";
import { type ImageProps, View } from "react-native";

const LoadingIndicator = (props: ImageProps): React.ReactElement => (
	<View>
		<Spinner size="small" />
	</View>
);

export default LoadingIndicator;
