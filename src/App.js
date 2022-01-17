import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import LendBook from "./pages/LendBook";
import TradeBook from "./pages/TradeBook";
import SellBook from "./pages/SellBook";
// import { Routes, Route,  } from "react-router-dom";
// import LendBook from "./routes/LendBook";
// import TradeBook from "./routes/TradeBook";
// import NoMatch from "./routes/NoMatch";

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
      
     
     
      
    </div>
  );
}

export default App;
