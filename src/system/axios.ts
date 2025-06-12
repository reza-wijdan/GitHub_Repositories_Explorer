import axios from "axios"

let URL_GITHUB = "https://api.github.com/"

export default axios.create({
    baseURL: URL_GITHUB
})