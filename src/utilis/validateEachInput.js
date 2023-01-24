/** @format */

export let errors = {
  firstNameError: "",
  lastNameError: "",
  userNameError: "",
  emailError: "",
};

export const validateFirstName = (fname) => {
  if (fname.length < 3) {
    errors.firstNameError = "first name must have at least 3 characters";
  } else {
    errors.firstNameError = "";
    return true;
  }
};

export const validateLastName = (lname) => {
  if (lname.length < 3) {
    errors.lastNameError = "last name must have at least 3 characters";
  } else {
    errors.lastNameError = "";
    return true;
  }
};

function isLetter(c) {
  return c.toLowerCase() !== c.toUpperCase();
}

function isNumber(n) {
  return !isNaN(n);
}

export const validateUserName = (username) => {
  // Liczba znaków numerycznych w 'username'.
  let numbersCount = 0;

  // Liczba znaków specjalnych w 'username'.
  let containsSpecialChars = false;

  for (let letter of username) {
    if (isNumber(letter)) {
      numbersCount++;
      continue;
    }

    if (isLetter(letter)) {
      continue;
    }

    containsSpecialChars = true;
    break;
  }

  if (username.length > 10) {
    errors.userNameError = "usernmae is too long must be max 10 characters";
    return false;
  }

  if (containsSpecialChars) {
    errors.userNameError = "username cannot contain special characters";
    return false;
  }

  if (numbersCount < 2) {
    errors.userNameError = "username must contain at least 2 numbers";
    return false;
  }
  errors.userNameError = " ";
  return true;
};

export const validateEmail = (email) => {
  if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    errors.emailError = "invalid email";
  } else {
    errors.emailError = "";
    return true;
  }
};
