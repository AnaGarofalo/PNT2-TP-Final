import axios from "axios";
import { baseUrl } from "../../env.json";

export default class AuthService {
  #url;

  constructor() {
    this.#url = baseUrl + "/auth";
  }

  login = async ({ email, password }) => {
    try {
      const { data: response } = await axios.post(this.#url + "/login", {
        email,
        password,
      });
      return response;
    } catch (error) {
      return error.response.data;
    }
  };
}
