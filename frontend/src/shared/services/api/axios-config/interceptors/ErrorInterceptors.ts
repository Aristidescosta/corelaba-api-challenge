import { AxiosError } from "axios";

export const errorInterceptors = (error: AxiosError) => {

    console.log(error.response?.status, error.message)

    if (error.message === "Network Error") {
        console.log("Erro de conexão")
        return Promise.reject(new Error("Erro de conexão"));
    }

    if (error.response?.status === 401) {
        const data = error.response.data
        const { errors } = data as { errors: { default: string } };

        return Promise.reject(new Error(errors.default))
    }

    if (error.response?.status === 500) {
        const data = error.response.data
        const { errors } = data as { errors: { default: string } };

        return Promise.reject(new Error(errors.default))
    }

    if (error.response?.status === 400) {
        console.log(error.response)
        return Promise.reject(new Error("Erro no formato dos dados!"))
    }

    return Promise.reject(error);
};