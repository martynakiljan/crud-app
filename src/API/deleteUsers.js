/** @format */

import fetchUsers from "./fetchUsers";

const deleteUsers = async (id) => {
  let data = {
    id: id,
  };

  const requestOptions = {
    method: "DELETE",
    headers: {
      Accept: "application/form-data",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(
    "https://www.melivecode.com/api/users/delete",
    requestOptions
  )
    .then((response) => response.json())
    .then((response) => {
      fetchUsers();
      return response;
    });
  console.log(response);
  return response;
};

export default deleteUsers;
