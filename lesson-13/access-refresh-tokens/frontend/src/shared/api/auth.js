import axios from "axios";

const instance = axios.create({
    baseURL: "https://auth-backend-lesson.herokuapp.com/api"
});

// instance.interceptors.request.use(async (config)=> {
//     const accessToken = localStorage.getItem("accessToken");
//     config.headers.common.authorization = `Bearer ${accessToken}`;

//     return config;
// })

const setToken = (token) => {
    if(token) {
        return instance.defaults.headers.common.authorization = `Bearer ${token}`;
    }
    instance.defaults.headers.common.authorization = "";
}

instance.interceptors.response.use(response => response, async (error) => {
    const {response, config} = error;
    if(response.status === 401){
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            const {data} = await instance.post("/auth/refresh", {refreshToken});
            setToken(data.accessToken);
            config.headers.common.authorization = `Bearer ${data.accessToken}`;
            localStorage.setItem("refreshToken", data.refreshToken);

            return instance(config);
        }
        catch(error) {
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
})

export const signup = async (data) => {
    const {data: result} = await instance.post("/users/signup", data);
    return result;
}

export const login = async (data) => {
    const {data: result} = await instance.post("/users/login", data);
    setToken(result.accessToken);
    localStorage.setItem("refreshToken", result.refreshToken);
    return result;
}

export const logout = async() => {
    const data = await instance.post("/users/logout");
    setToken();
    localStorage.removeItem("refreshToken");
    return data;
}

export const getCurrent = async(token) => {
    try {
        setToken(token);
        const {data} = await instance.get("/users/current");
        return data;
    } catch (error) {
        setToken();
        throw error;
    }
}

export default instance;