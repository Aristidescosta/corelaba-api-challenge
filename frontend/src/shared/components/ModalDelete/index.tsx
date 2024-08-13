import React from "react";
import "./modal.scss";
import { Button } from "../Button";

interface IModalDeleteProps {
  onClose: () => void;
}

export const ModalDelete: React.FC<IModalDeleteProps> = ({ onClose }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span onClick={onClose} className="close">
          &times;
        </span>
        <p>Deseja realmente apagar esse item?</p>
        <div>
          <p>Este processo é irreversível</p>
          <div className="flex">
            <Button onClick={onClose} colorScheme="gray">
              Cancelar
            </Button>
            <Button>Continuar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
