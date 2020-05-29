import axios from "axios";

export const AxiosService = axios.create({
  baseURL: "https://www.reddit.com/r/all/top/.json?t=all&limit=10",
  headers: {
    "Content-Type": "application/json"
  }
});



