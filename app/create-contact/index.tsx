import { apiUrl, robohashUrl } from "@/constants";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { View } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postContact } from "@/services/contact.service";

const formSchema = z.object({
	firstName: z
		.string({ message: "First name is required" })
		.min(1, { message: "Please put correct first name" }),
	lastName: z
		.string({ message: "Last name is required" })
		.min(1, { message: "Please put correct last name" }),
	age: z
		.string({ message: "Age is required" })
		.min(1, { message: "Please put correct age" }),
	photo: z.string({ message: "Please generate avatar link" }),
});

const Spacer = () => <View style={{ paddingVertical: 8 }} />;

export default function CreateContact({ navigation }: NavigationProps) {
	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const { mutate: createContact, isPending } = useMutation({
		mutationKey: ["post-contact"],
		mutationFn: postContact,
		onSuccess() {
			navigation.navigate("home");
		},
	});

	const generateRandomAvatarLink = () => {
		const mathRandom = Math.floor(Math.random() * 1000);
		const firstName = form.getValues("firstName") ?? "";
		const randomHash = `${robohashUrl}/${firstName}${mathRandom}`;

		form.setValue("photo", randomHash);
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		await createContact(values);
		queryClient.prefetchQuery({ queryKey: ["get-contacts"] });
	};

	const {
		formState: { errors },
	} = form;

	return (
		<Layout style={{ flex: 1 }}>
			<View style={{ paddingTop: 14, paddingHorizontal: 20 }}>
				<Controller
					name="firstName"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							disabled={isPending}
							status={errors.firstName ? "danger" : ""}
							label={(props) => <Text {...props}>First Name</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Enter first name"
						/>
					)}
				/>
				{errors.firstName && (
					<Text status="danger">{errors.firstName.message}</Text>
				)}

				<Spacer />

				<Controller
					name="lastName"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							disabled={isPending}
							status={errors.lastName ? "danger" : ""}
							label={(props) => <Text {...props}>Last Name</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Enter last name"
						/>
					)}
				/>
				{errors.lastName && (
					<Text status="danger">{errors.lastName.message}</Text>
				)}

				<Spacer />

				<Controller
					name="age"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							disabled={isPending}
							status={errors.age ? "danger" : ""}
							label={(props) => <Text {...props}>Age</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Enter age"
						/>
					)}
				/>
				{errors.age && <Text status="danger">{errors.age.message}</Text>}

				<Spacer />

				<Controller
					name="photo"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<>
							<Input
								status={errors.firstName ? "danger" : ""}
								label={(props) => <Text {...props}>Avatar URL</Text>}
								onBlur={onBlur}
								onChangeText={onChange}
								disabled
								value={value}
								placeholder="Please generate avatar link"
							/>
							{errors.photo && (
								<Text status="danger">{errors.photo.message}</Text>
							)}

							<Button
								appearance="ghost"
								size="tiny"
								style={{ marginTop: 14 }}
								onPress={generateRandomAvatarLink}
							>
								{(props) => <Text {...props}>Generate Link</Text>}
							</Button>
						</>
					)}
				/>

				<Spacer />

				<Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
					Submit
				</Button>
			</View>
		</Layout>
	);
}
