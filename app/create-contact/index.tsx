import { apiUrl, robohashUrl } from "@/constants";
import {
	Layout,
	Text,
	Input,
	Button,
	TopNavigation,
	Icon,
} from "@ui-kitten/components";
import { type ImageProps, View } from "react-native";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	deleteContact,
	postContact,
	updateContact,
} from "@/services/contact.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { BackAction } from "@/components/navigation/BackAction";
import { useEffect, useState } from "react";

const formSchema = z.object({
	firstName: z
		.string({ message: "First name is required" })
		.min(0, { message: "Please put correct first name" }),
	lastName: z
		.string({ message: "Last name is required" })
		.min(0, { message: "Please put correct last name" }),
	age: z
		.string({ message: "Age is required" })
		.min(1, { message: "Please put correct age" }),
	photo: z.string({ message: "Please generate avatar link" }),
});

const Spacer = () => <View style={{ paddingVertical: 8 }} />;

export default function CreateContact({ navigation, route }: NavigationProps) {
	const { params } = route;
	const isEdit = !!params;

	const queryClient = useQueryClient();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			photo: "",
		},
	});

	const [errMessage, setErrMessage] = useState("");

	const { mutate: createContact, isPending } = useMutation({
		mutationKey: ["post-contact"],
		mutationFn: postContact,
		onSuccess(data) {
			queryClient.prefetchQuery({ queryKey: ["get-contacts"] });
			navigation.navigate("home");
		},
		onError(err) {
			setErrMessage(err.message);
		},
	});

	const { mutate: putContact, isPending: isPendingUpdate } = useMutation({
		mutationKey: ["update-contact"],
		mutationFn: updateContact,
		onSuccess(data) {
			queryClient.prefetchQuery({ queryKey: ["get-contacts"] });
			navigation.navigate("home");
		},
		onError(err) {
			// setErrMessage(err.message);

			const filteredData = queryClient
				.getQueryData(["get-contacts"])
				?.data?.map((item: Contact) => {
					if (item.id === params?.item?.id) {
						return {
							...item,
							...form.getValues(),
						};
					}
					return item;
				});

			queryClient.setQueryData(["get-contacts"], {
				message: "",
				data: filteredData,
			});

			navigation.navigate("home");
		},
	});

	const { mutate: removeContact, isPending: isPendingDelete } = useMutation({
		mutationKey: ["delete-contact"],
		mutationFn: deleteContact,
		onSuccess() {
			queryClient.prefetchQuery({ queryKey: ["get-contacts"] });
			navigation.navigate("home");
		},
		onError(err) {
			// setErrMessage(err.message);

			const filteredData = queryClient
				.getQueryData(["get-contacts"])
				?.data?.filter((item: Contact) => item.id !== params?.item?.id);

			queryClient.setQueryData(["get-contacts"], {
				message: "",
				data: filteredData,
			});
			navigation.navigate("home");
		},
	});

	const isLoading = isPending || isPendingUpdate;

	const generateRandomAvatarLink = () => {
		const mathRandom = Math.floor(Math.random() * 1000);
		const firstName = form.getValues("firstName") ?? "";
		const randomHash = `${robohashUrl}/${firstName}${mathRandom}`;

		form.setValue("photo", randomHash);
	};

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setErrMessage("");
		isEdit
			? await putContact({
					...values,
					age: Number(values.age),
					id: params.item?.id,
				})
			: await createContact({ ...values, age: Number(values.age) });
	};

	const handleDelete = async () => {
		await removeContact(params.item.id);
	};

	const {
		formState: { errors },
	} = form;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (params) {
			const { item } = params;
			Object.entries(item).map(([key, values]) => {
				form.setValue(
					key as keyof z.infer<typeof formSchema>,
					key === "age" ? Number(values) : (String(values) as any),
				);
			});
		}
	}, [params]);

	return (
		<Layout style={{ flex: 1 }}>
			<TopNavigation
				title={<Text>{isEdit ? "Edit" : "Create"} Contact</Text>}
				accessoryLeft={BackAction}
			/>
			<View style={{ paddingTop: 14, paddingHorizontal: 20 }}>
				{/* {errMessage && (
					<View
						style={{
							borderRadius: 4,
							padding: 10,
							marginBottom: 8,
							backgroundColor: "#ff708d",
						}}
					>
						<Text style={{ color: "#fff" }} category="s1">
							‼️ Error
						</Text>
						<Text category="c1">{errMessage}</Text>
					</View>
				)} */}

				<Controller
					name="firstName"
					control={form.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<Input
							disabled={isLoading}
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
							disabled={isLoading}
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
							disabled={isLoading}
							status={errors.age ? "danger" : ""}
							label={(props) => <Text {...props}>Age</Text>}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							keyboardType="number-pad"
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
								{(props) => <Text {...props}>🔀 Generate Link</Text>}
							</Button>
						</>
					)}
				/>

				<Spacer />

				<Button
					onPress={form.handleSubmit(onSubmit)}
					disabled={isLoading}
					accessoryLeft={() => <LoadingIndicator />}
					size="small"
				>
					{isEdit ? "Update" : "Create"}
				</Button>

				<Spacer />

				{isEdit && (
					<Button
						onPress={handleDelete}
						accessoryLeft={<Icon name="trash" />}
						status="danger"
						appearance="outline"
						size="small"
					>
						Delete Contact
					</Button>
				)}
			</View>
		</Layout>
	);
}
