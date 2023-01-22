const createNewUsers = async (fname, lname, username, email) => {


  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fname: fname,
      lname: lname,
      username: username,
      email: email,
      avatar: "https://www.melivecode.com/users/cat.png",
    }),
  };


  fetch("https://www.melivecode.com/api/users/create", requestOptions)
    .then((response) => response.json())
    .then((response) => {
      console.log("Success:", response);
      return response;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default createNewUsers;
