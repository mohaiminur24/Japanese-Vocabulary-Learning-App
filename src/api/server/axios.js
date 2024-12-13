
import axios from "axios";


  const server = axios.create({
    baseURL: "https://jp-vocabulary-task-server.vercel.app/",
    headers: {
      'Content-Type': 'application/json',
    },
  });

  server.interceptors.request.use((config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.authorize = `Bearer ${token}`;
    }
    return config;
  });

  server.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.removeItem("access-token");
      }
      return Promise.reject(error);
    }
  );

  export default server;


