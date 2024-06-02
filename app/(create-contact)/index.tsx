import { apiUrl } from "@/constants";
import {
	Layout,
	Text,
	TopNavigation,
	Divider,
	Input,
	Button,
} from "@ui-kitten/components";
import { View } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
	firstName: z
		.string({ message: "First name is required" })
		.min(1, { message: "Please put correct first name" }),
	lastName: z
		.string({ message: "Last name is required" })
		.min(1, { message: "Please put correct last name" }),
	age: z.string({ message: "Age is required" }),
	photo: z.string({ message: "Please generate avatar link" }).optional(),
});

export default function CreateContactPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const {
		formState: { errors },
	} = form;

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log("fff", values);
	};

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation title="Create Contact" />
			<Divider />

			<View style={{ paddingTop: 14, paddingHorizontal: 20 }}>
				<Controller
					name="firstName"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							status={errors.firstName ? "danger" : ""}
							label={(props) => <Text {...props}>First Name</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.firstName && <Text>First name is required</Text>}

				<Controller
					name="lastName"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							status={errors.firstName ? "danger" : ""}
							label={(props) => <Text {...props}>Last Name</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.lastName && <Text>Last name is required</Text>}

				<Controller
					name="age"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							status={errors.firstName ? "danger" : ""}
							label={(props) => <Text {...props}>Age</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.age && <Text>Age is required</Text>}

				<Controller
					name="photo"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							status={errors.firstName ? "danger" : ""}
							label={(props) => <Text {...props}>Avatar URL</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							disabled
							value={value}
						/>
					)}
				/>
				{errors.firstName && <Text>First name is required</Text>}

				<Button onPress={form.handleSubmit(onSubmit)}>Submit</Button>
			</View>
		</Layout>
	);
}
