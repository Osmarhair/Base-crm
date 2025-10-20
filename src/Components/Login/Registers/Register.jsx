import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig'; // Ajuste o caminho se necessário

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("A senha precisa ter no mínimo 6 caracteres.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuário cadastrado com sucesso!", user);
        alert(`Cadastro realizado com sucesso! Bem-vindo, ${user.email}!`);
      })
      .catch((err) => {
        console.error("Erro no cadastro:", err.message);
        if (err.code === 'auth/email-already-in-use') {
          setError("Este e-mail já está em uso.");
        } else {
          setError("Ocorreu um erro ao tentar cadastrar.");
        }
      });
  };

  return (
    // Adicionei um className para você poder estilizar este container
    <div className="register-container"> 
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Crie uma senha"
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
      {/* A mensagem de erro também tem uma classe para estilização */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Register;