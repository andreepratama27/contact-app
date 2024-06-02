/* eslint-disable no-useless-catch */
import axios from "@/lib/axios";

const getContact = async (): Promise<ApiResponse<Contact[]>> => {
	try {
		const response = await axios.get("/contact");
		return response.data;
	} catch (error) {
		// biome-ignore lint/complexity/noUselessCatch: <explanation>
		throw error;
	}
};

const postContact = async (payload: Omit<Contact, "id">) => {
	try {
		const response = await axios.post("/contact", payload);
		return response.data;
	} catch (error) {
		// biome-ignore lint/complexity/noUselessCatch: <explanation>
		throw error;
	}
};

const updateContact = async (payload: Partial<Contact>) => {
	try {
		const { id, ...restPayload } = payload;
		const response = await axios.put(`/contact/${id}`, restPayload);
		return response.data;
	} catch (error) {
		// biome-ignore lint/complexity/noUselessCatch: <explanation>
		throw error;
	}
};

const deleteContact = async (id: string) => {
	try {
		const response = await axios.delete(`/contact/${id}`);
		return response.data;
	} catch (error) {
		// biome-ignore lint/complexity/noUselessCatch: <explanation>
		throw error;
	}
};

export { getContact, postContact, updateContact, deleteContact };
