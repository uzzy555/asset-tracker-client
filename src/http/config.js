import axios from "axios";

const baseURL = "http://localhost:8000/";
export const FakeProductClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
