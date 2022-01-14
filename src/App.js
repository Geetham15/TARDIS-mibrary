import "./App.css";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
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
      <p>testMessage</p>
      <Layout>
        
      </Layout>
    </div>
  );
}

export default App;
