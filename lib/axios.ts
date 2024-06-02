import axiosService from "axios";
import { apiUrl } from "@/constants";

const axios = axiosService.create({
	baseURL: apiUrl,
});

export default axios;
