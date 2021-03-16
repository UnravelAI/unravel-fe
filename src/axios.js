import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

const AuthInterceptor = () => {
  let interceptor;
  return {
    // Activates authentication interceptor on every request
    activate: () => {
      // Access token request patcher
      interceptor = axios.interceptors.request.use(
        async (config) => {
          const accessToken = localStorage.getItem("accessToken");
          config.headers = {
            Authorization: `${accessToken}`,
            Accept: "application/json",
          };
          return config;
        },
        (error) => {
          return Promise.reject(error);
        },
      );
    },
    // Deactivates authentication interceptor
    deactivate: () => {
      axios.interceptors.request.eject(interceptor);
    },
  };
};

export const authInterceptor = AuthInterceptor();
export default axios;
