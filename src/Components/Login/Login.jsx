import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";

import "./Login.css";



const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("teste", username, password);

        console.log("Envio");
    };

  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
            <h1>Acesso</h1>
            <div className="input-field">
                <input type="email"
                placeholder='E-mail'
                required
                onChange={(e) => setUsername(e.target.value)}/>
                <FaUser className="icon" />
            </div>
            <div className="input-field">
                <input type="password"
                placeholder='Senha'
                onChange={(e) => setPassword(e.target.value)}/>
                <FaLock className="icon" />
            </div>

            <div className="recall-forget">
                <label>
                    <input type="checkbox" />
                    Lembrar de mim
                </label>
                <a href="a">Esqueceu a senha?</a>                
            </div>

            <button>Entrar</button>

            <div className="signup-link">
                <p>
                    Não tem acesso? <a href="a">Registrar</a>
                </p>
            </div>
        </form>
    </div>
  )
}

export default Login