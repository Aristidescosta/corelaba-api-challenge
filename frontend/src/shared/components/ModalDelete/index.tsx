import React from "react";
import "./modal.scss";
import { Button } from "../Button";
import { useTask } from "@/shared/hooks";

interface IModalDeleteProps {
  onClose: () => void;
  handleDeleteTask: (taskId: number) => Promise<void>;
}

export const ModalDelete: React.FC<IModalDeleteProps> = ({
  onClose,
  handleDeleteTask,
}) => {
  const task = useTask((state) => state.task);

  const onDeleteTask = async () => {
    if (task) {
      await handleDeleteTask(task.id);
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
            <Button onClick={onDeleteTask}>Continuar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
