import axios from "axios";

export default class GenreService {
  #prefix;

  constructor() {
    this.#prefix = "/genre";
  }

  getAll = async () => {
    try {
      const { data } = await axios.get(this.#prefix);
      return data.message;
    } catch (error) {
      return error.response.data;
    }
  };
}
