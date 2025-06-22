import axios from "axios";

export default class ReviewService {
  #prefix;

  constructor() {
    this.#prefix = "/review";
  }

  create = async (review) => {
    try {
      const { data } = await axios.post(this.#prefix, review);
      return data;
    } catch (error) {
      return error.response.data;
    }
  };
}
