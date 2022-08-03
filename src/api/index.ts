import axios, { AxiosInstance } from "axios";

export const baseURL = process.env.API_URL || "http://192.168.0.5:3333";

const api = axios.create({
	baseURL,
	headers: {
		Authorization: "",
	},
});

export default api;
