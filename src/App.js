import "./App.css";
import { useState, useEffect } from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import CardList from "./components/CardList"
import BookList from "./components/BookList";

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
     <Header/>
     <CardList/>
     <BookList />
     <Footer/>




    </div>

  );
}

export default App;
