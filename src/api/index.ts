import axios from "axios";

export const baseURL = process.env.API_URL || "http://192.168.0.5:3333";

const api: any = axios.create({
	baseURL,
});

export default api;
