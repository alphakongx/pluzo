import { PhoneNumberUtil } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

class Validator {
  static isValidPhone(number, countryCode) {
    try {
      const parsedNumber = phoneUtil.parse(number, countryCode);
      return phoneUtil.isValidNumber(parsedNumber);
    } catch (err) {
      return false;
    }
  }
}

export { Validator };
