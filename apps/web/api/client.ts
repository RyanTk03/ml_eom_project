import axios from "axios";

export const axiosForApiCall = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 100000,
});

axiosForApiCall.interceptors.request.use((configs) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    configs.headers.Authorization = `Bearer ${accessToken}`;
  }

  return configs;
});
