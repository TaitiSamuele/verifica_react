import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Singup from "./Singup";
import Login from "./Login";

function App() {
  //variabili globali
  
  const [singup, setSingup] = useState(false);
  const [login, setLogin] = useState(false);
  const [risposta, setRisposta] = useState(null);



  return (
    <>
      <Singup setRisposta={setRisposta}/>

      <hr />
      
      <Login setRisposta={setRisposta}/>
      <hr />
      {risposta !== null && (
        <>
          <h4>{risposta}</h4>
        </>
      )}
    </>
  );
}

export default App;
