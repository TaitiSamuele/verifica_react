import { useState } from "react";

export default function Singup({setRisposta}){
    const [singup, setSingup] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [conferma, setConferma] = useState(null);
    const [email, setMail] = useState(null);

    function gestisciUsername(e) {
        setUsername(e.target.value);
      }
      function gestisciPassword(e) {
        setPassword(e.target.value);
      }
      function gestisciConferma(e) {
        setConferma(e.target.value);
      }
      function gestisciMail(e) {
        setMail(e.target.value);
      }

    async function inviaSingup() {
        console.log(username);
        if (password  !==  conferma) {
          setRisposta("le 2 password non corrisondono");
          return;
        }
        if (
          username == null ||
          password == null ||
          conferma == null ||
          email == null
        ) {
          setRisposta("riempi tutti i campi");
          return;
        }
        console.log(
          JSON.stringify({ username: username, password: password, email: email })
        );
        const response = await fetch(`http://localhost:8080/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
          }),
        });
    
        const json = await response.json();
    
        if (json.status === true) {
          setRisposta("registrazione completata");
        } else {
          setRisposta("username o mail gia' in uso");
        }
      }


    return(
        <>
            {!singup ? (
                <>
                <button
                    onClick={() => {
                    setSingup(true);
                    }}
                >
                    Singup
                </button>
                </>
            ) : (
                <>
                <p>username</p>
                <input type="text" onChange={gestisciUsername} />
                <p>password</p>
                <input type="password" onChange={gestisciPassword} />
                <p>conferma la password</p>
                <input type="password" onChange={gestisciConferma} />
                <p>mail</p>
                <input type="email" onChange={gestisciMail} />
                <br/>
                <br/>
                <button
                    onClick={() => {
                    inviaSingup();
                    setSingup(false);
                    }}
                >
                    singup
                </button>
                <button
                    onClick={() => {
                    setSingup(false);
                    setUsername(null);
                    setPassword(null);
                    setConferma(null);
                    setMail(null);
                    }}
                >
                    annulla singup
                </button>
                </>
            )}
        </>
    );
}