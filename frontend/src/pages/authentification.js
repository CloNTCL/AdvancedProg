import React from "react";
import "../styles/authentification.css"; 

const Authentification = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Connexion</h2>
        <form>
          <div className="auth-field">
            <label>Nom d'utilisateur</label>
            <input type="text" placeholder="Entrer votre nom d'utilisateur" />
          </div>
          <div className="auth-field">
            <label>Mot de passe</label>
            <input type="password" placeholder="Entrer votre mot de passe" />
          </div>
          <button className="auth-button" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentification;
