export function validatEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

export function validatPassword(password) {
  return password.trim().length < 8;
}

export function isEmpty(text) {
  return text.trim() === "";
}

export function validatPhone(phone) {
    const egyptPhoneRegex = /^01[0125][0-9]{8}$/;
    return egyptPhoneRegex.test(phone.trim())
}
