/** @format */

import React from "react";
import fetchUsers from "./API/fetchUsers";
import Topbar from "./components/Topbar";
import Container from "./components/Container";
import Context from "./utilis/context";

const App = () => {
  const [data, setData] = React.useState(null);

  const getFetch = async () => {
    const users = await fetchUsers();
    setData(users);
  };

  React.useEffect(() => {
    getFetch();
  }, []);

  return (
    <>
      <Context.Provider value={data}>
        <Topbar position="static"></Topbar>
        <Container sx={{ minHeight: "100vh" }} />
      </Context.Provider>
    </>
  );
};

export default App;
