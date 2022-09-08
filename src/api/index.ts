import axios from "axios";

// export const baseURL = process.env.API_URL || "http://192.168.1.6:3333";

export const baseURL = process.env.API_URL || "http://192.168.1.5:3333/api/";

const api = axios.create({
	baseURL,
});

export default api;
