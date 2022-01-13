import "./App.css";
import { useState, useEffect } from "react";
import AddBooks from "./components/AddBooks";

function App() {
  const [data, loadData] = useState();
  const fetchData = async () => {
    // load data here (fetch)
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold  text-green-700  text-center ">
        Book Exchange App
      </h1>
      <AddBooks />
    </div>
  );
}

export default App;
