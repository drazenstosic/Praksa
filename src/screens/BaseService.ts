import axios from "axios";
require("dotenv").config();
const baseURL = process.env.REACT_APP_BASE_URL;
export class BaseService {
  protected instance = axios.create({
    baseURL: "localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default {};