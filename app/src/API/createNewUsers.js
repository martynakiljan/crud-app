const createNewUsers = async (firstname, lastname, email) => {
  console.log(firstname, lastname, email);

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  };

  fetch("https://www.mecallapi.com/api/users/create", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export default createNewUsers;
