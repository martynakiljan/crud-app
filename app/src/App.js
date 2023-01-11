import React from "react";
import "./App.css";
import getResponse from "./utilis";
import Topbar from "./components/Topbar";
import Container from "./components/Container";
import Context from "./context";
import Content from "./components/Content";

const App = () => {
  const [data, setData] = React.useState(null);

  const getFetch = async () => {
    const users = await getResponse();
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
