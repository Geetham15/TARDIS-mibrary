import "./App.css";
import { useState, useEffect } from "react";

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
       <h1 className="text-3xl font-bold  text-green-700  text-center ">Book Exchange App</h1>
    </div>
  );

  
   
 
}

export default App;
