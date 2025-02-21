import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://task-nest-server-delta.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;