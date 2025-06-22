export default class StringUtils {
  static capitalize(str) {
    return str.length
      ? str[0].toUpperCase() +
          str.split("").splice(1, str.length).join("").toLowerCase()
      : str;
  }
}
