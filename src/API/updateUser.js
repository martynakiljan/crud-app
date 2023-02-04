// /** @format */

// const deleteUsers = async (data) => {
//   var data = {
//     id: id,
//     fname: fname,
//     lname: lname,
//     username: username,
//     email: email,
//     avatar: avatar,
//   };

//   const requestOptions = {
//     method: "PUT",
//     headers: {
//       Accept: "application/form-data",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };

//   const response = await fetch(
//     "https://www.melivecode.com/api/users/update",
//     requestOptions
//   )
//     .then((response) => response.json())
//     .then((res) => res.json())
//     .then((result) => {
//       alert(result["message"]);
//       if (result["status"] === "ok") {
//         window.location.href = "/";
//       }
//     });
//   return response;
// };

// export default deleteUsers;
