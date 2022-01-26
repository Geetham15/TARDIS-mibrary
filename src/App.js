import "./App.css";
import { useState, useEffect } from "react";

import Home from "./pages/Home";

function App() {
  const [data, loadData] = useState();
  const fetchData = async () => {
    // load data here (fetch)
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div className="App"></div>;
}

export default App;
