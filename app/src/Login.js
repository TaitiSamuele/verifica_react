import { useState } from "react";

export default function Login({setRisposta}){
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function inviaLogin() {
        const token = await fetch(`http://localhost:8080/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
        });
    
        const json = await token.json();

        if(json.token === ""){
            setRisposta(
                "credenziali invalide"
            );
            return;
        }

    
        console.log(json.token);
    
        //stampa risposta
    
        const response = await fetch(`http://localhost:8080/user/${json.token}`, {
          method: "GET"
        });
        console.log(response);
        
    
        const utente = await response.json();
    
        setRisposta(
          `
            id: ${utente.id}
            username: ${utente.username}
            email: ${utente.email}
            token: ${utente.token}
            reg_date: ${utente.reg_date}
          `
        );
      }

      function gestisciUsername(e) {
        setUsername(e.target.value);
      }
      function gestisciPassword(e) {
        setPassword(e.target.value);
      }

      return(
        <>
            {!login ? (
                <>
                <button
                    onClick={() => {
                    setLogin(true);
                    }}
                >
                    Login
                </button>
                </>
            ) : (
                <>
                <p>username</p>
                <input type="text" onChange={gestisciUsername} />
                <p>password</p>
                <input type="password" onChange={gestisciPassword} />
                <br/>
                <br/>
                <button
                    onClick={() => {
                    inviaLogin();
                    setLogin(false);
                    }}
                >
                    login
                </button>
                <button
                onClick={() => {
                    setLogin(false);
                    setUsername(null);
                    setPassword(null);
                }}>
                    annulla login
                </button>
                </>
            )}
          </>
      );

}