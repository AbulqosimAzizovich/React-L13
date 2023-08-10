import { data } from "autoprefixer";
import axios from "../axios";  

const postApi = {
    getPost: async function () {
        return axios.get("/posts");
    },
    createPost: function (data) {
        axios.post("/posts", data)
    },
    getpostItem: async function (id) {
        return axios.get(`/posts/${id}`)
    }
}

export default postApi;