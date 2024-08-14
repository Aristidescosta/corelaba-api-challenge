import React from "react";

interface IHeaderProps {
  whenChangingSearchText?: (newText: string) => void;
  searchText?: string;
}

export const Header: React.FC<IHeaderProps> = ({
  whenChangingSearchText,
  searchText,
}) => {
  return (
    <header>
      <div>
        <img src="logo.png" alt="Logo do core notes" className="logo" />
        <h1>CoreNotes</h1>
      </div>
      <div className="search">
        <input
          onChange={(e) => whenChangingSearchText?.(e.target.value)}
          type="text"
          value={searchText}
          placeholder="Pesquisar notas"
        />
        <img src="search.png" alt="Ícone de pesquisar" />
      </div>

      <button>
        <img src="close.png" alt="Ícone fechar" className="logo" />
      </button>
    </header>
  );
};
