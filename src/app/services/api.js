import axios from "axios";

export const AxiosService = axios.create({
  baseURL: "https://www.reddit.com/r/all/top",
  headers: {
    "Content-Type": "application/json"
  }
});



