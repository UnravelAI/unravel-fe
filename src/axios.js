import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://unravel-backend.herokuapp.com",
  timeout: 999999999,
});

const AuthInterceptor = () => {
  let requestInterceptor;
  let responseInterceptor;
  return {
    // Activates authentication interceptor on every request
    activate: () => {
      // Access token request patcher
      requestInterceptor = axios.interceptors.request.use(
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
        }
      );
      // Handle 401 by clearning the access token
      responseInterceptor = axios.interceptors.response.use(
        async (config) => {
          return config;
        },
        (error) => {
          if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
          }
          return Promise.reject(error);
        }
      );
    },
    // Deactivates authentication interceptor
    deactivate: () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.request.eject(responseInterceptor);
    },
  };
};

export const authInterceptor = AuthInterceptor();
export default axios;
