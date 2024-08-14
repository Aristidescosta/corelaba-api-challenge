import React from "react";

export const Header: React.FC = () => {
  return (
    <header>
      <div>
        <img src="logo.png" alt="Logo do core notes" className="logo" />
        <h1>CoreNotes</h1>
      </div>
      <div className="search">
        <input type="text" placeholder="Pesquisar notas" />
        <img src="search.png" alt="Ícone de pesquisar" />
      </div>

      <button>
        <img src="close.png" alt="Ícone fechar" className="logo" />
      </button>
    </header>
  );
};
