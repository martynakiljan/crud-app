/** @format */

export const validateFirstName = (
  fname: string,
  setFormErrors: (name: string, error: string) => void
) => {
  if (fname.length < 3) {
    setFormErrors("firstName", "first name must have at least 3 characters");
  } else {
    setFormErrors("firstName", "");
    return true;
  }
};

export const validateLastName = (
  lname: string,
  setFormErrors: (name: string, error: string) => void
) => {
  if (lname.length < 3) {
    setFormErrors("lastName", "last name must have at least 3 characters");
  } else {
    setFormErrors("lastName", "");
    return true;
  }
};

function isLetter(c: any) {
  return c.toLowerCase() !== c.toUpperCase();
}

function isNumber(n: any) {
  return !isNaN(n);
}

export const validateUserName = (
  username: string,
  setFormErrors: (name: string, error: string) => void
) => {
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
    setFormErrors("userName", "usernmae is too long must be max 10 characters");
    return false;
  }

  if (containsSpecialChars) {
    setFormErrors("userName", "username cannot contain special characters");
    return false;
  }

  if (numbersCount < 2) {
    setFormErrors("userName", "username must contain at least 2 numbers");
    return false;
  }
  setFormErrors("userName", "");
  return true;
};

export const validateEmail = (
  email: string,
  setFormErrors: (name: string, error: string) => void
) => {
  if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    setFormErrors("email", "invalid email");
  } else {
    setFormErrors("email", "");
    return true;
  }
};

// export const validateAvatar = (avatar, setFormErrors) => {
//   if (avatar === "") {
//     setFormErrors("avatar", "avatar is missing");
//   } else {
//     setFormErrors("avatar", "");
//     return true;
//   }
// };
