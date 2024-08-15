import React from "react";
import "./modal.scss";
import { Button } from "../Button";
import { useNote } from "@/shared/hooks";

interface IModalDeleteProps {
  onClose: () => void;
  handleDeleteNote: (noteId: number) => Promise<void>;
}

export const ModalDelete: React.FC<IModalDeleteProps> = ({
  onClose,
  handleDeleteNote,
}) => {
  const note = useNote((state) => state.note);

  const onDeleteNote = async () => {
    if (note) {
      await handleDeleteNote(note.id);
    }
  };

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
            <Button onClick={onDeleteNote}>Continuar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
