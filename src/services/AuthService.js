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

  createAndLogin = async ({ email, password, name }) => {
    try {
      const { data: response } = await axios.post(
        this.#prefix + "/create-and-login",
        {
          email,
          password,
          name,
        }
      );

      return response;
    } catch (error) {
      return error.response.data;
    }
  };
}
