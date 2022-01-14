import "./App.css";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
function App() {
  const [testMessage, setTestMessage] = useState();
  const testing = async () => {
    let response = await fetch("/api/bookList");
    response = await response.json();
    console.log(response);
    setTestMessage(response);
  };
  useEffect(() => {
    testing();
  }, []);
  return (
    <div className="App">
      <p>{testMessage}</p>
      <Layout>
        
      </Layout>
    </div>
  );
}

export default App;
