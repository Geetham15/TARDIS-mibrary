import "./App.css";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import Layout from "./components/Layout";
=======
import AddBooks from "./components/AddBooks";

>>>>>>> 738a187aed06ffe73bfc6410f90ce1cc3ecf1d8d
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
<<<<<<< HEAD
      <p>{testMessage}</p>
      <Layout>
        
      </Layout>
=======
      <h1 className="text-3xl font-bold  text-green-700  text-center ">
        Book Exchange App
      </h1>
      <AddBooks />
>>>>>>> 738a187aed06ffe73bfc6410f90ce1cc3ecf1d8d
    </div>
  );
}

export default App;
