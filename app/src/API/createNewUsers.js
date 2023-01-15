import { useEffect } from "react";

const CreateNewUsers = async (state) => {
  console.log(state);
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    };
    fetch("https://www.mecallapi.com/api/users", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }, []);
};

export default CreateNewUsers;
