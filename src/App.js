import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardList from "./components/CardList";
import Title from "./components/Title";

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
      
      <Header />
      <Title name = "MiBrary"/>
      <CardList />
      <Footer />

      {/* <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path="/lend-a-book" element={<LendBook />} />
          <Route path="/trade-a-book" element={<TradeBook />} />

          
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
