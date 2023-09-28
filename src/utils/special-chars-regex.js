export function hasSpecialChars(value) {
    const specialCharsRegex = /[!@#$%^&*()_+={};':"\\|,.<>/?]+/;
    return specialCharsRegex.test(value);
}