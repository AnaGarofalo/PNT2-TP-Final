import axios from "axios";

export default class GameService {
  #prefix;

  constructor() {
    this.#prefix = "/game";
  }

  getAll = async () => {
    try {
      const { data } = await axios.get(this.#prefix);
      return data.message;
    } catch (error) {
      return error.response.data;
    }
  };

  getById = async (id) => {
    try {
      const { data } = await axios.get(this.#prefix + "/" + id);
      return data.message;
    } catch (error) {
      return error.response.data;
    }
  };
}
