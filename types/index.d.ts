type RootStackParamList = {
	Home: undefined;
	CreateContact: undefined;
	Detail: undefined;
};

type NavigationProps = NativeStackScreenProps<
	RootStackParamList,
	"CreateContact"
>;
