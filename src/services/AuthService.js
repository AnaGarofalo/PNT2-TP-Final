import axios from "axios";

export default class AuthService {
  #prefix;

  constructor() {
    this.#prefix = "/auth";
  }

  login = async ({ email, password }) => {
    try {
      const { data: response } = await axios.post(this.#prefix + "/login", {
        email,
        password,
      });

      return response;
    } catch (error) {
      return error.response.data;
    }
  };
}
