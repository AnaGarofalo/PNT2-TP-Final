import axios from "axios";
import { baseUrl } from "../../env.json";

export default class AuthService {
  #url;

  constructor() {
    this.#url = baseUrl + "/auth";
  }

  login = async ({ email, password }) => {
    try {
      const { data: user } = await axios.post(this.#url, { email, password });
      return user;
    } catch (error) {
      console.error("Error productos POST", error);
    }
  };
}
