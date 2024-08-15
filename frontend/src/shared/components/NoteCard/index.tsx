import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

import { INoteType } from "@/shared/types";

import { DropdownMenuColors } from "../DropdownMenuColors";
import { Tooltip } from "../Tooltip";
import { Divider } from "../Divider";

import "./note-card.scss";

interface INoteCardProps {
  toCreate?: boolean;
  note?: INoteType;
  handleCreateNote: (
    note: Omit<INoteType, "id">,
    callback?: () => void
  ) => Promise<void>;
  handleClickToDelete?: (note: INoteType) => void;
  handleEditNote?: (note: INoteType, toFavorite?: boolean) => Promise<void>;
}

export const NoteCard: React.FC<INoteCardProps> = ({
  handleClickToDelete,
  handleCreateNote,
  handleEditNote,
  toCreate,
  note,
}) => {
  const [cardColor, setCardColor] = useState("#FFF");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMenuColors, setShowMenuColors] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleClickToEdit = () => {
    inputRef.current?.focus();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowMenuColors(false);
    }
  };

  const clearInputs = () => {
    if (inputRef.current && textareaRef.current) {
      inputRef.current.value = "";
      textareaRef.current.value = "";
      setCardColor("#FFF");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (note && inputRef.current) {
      inputRef.current.value = note.title;
      setCardColor(note.color);
      setIsFavorite(note.isFavorite);
    }
  }, [note]);

  const onChangeNoteColor = (color: string) => {
    if (note) {
      handleEditNote?.({ ...note, color }, false).then(() => {
        setCardColor(color);
        setShowMenuColors(false);
      });
    } else {
      setCardColor(color);
    }
  };

  const onChangeFavoriteStatus = async () => {
    if (note) {
      const updatedNote = { ...note, isFavorite: !note.isFavorite };

      handleEditNote?.(updatedNote, true).then(() =>
        setIsFavorite(note.isFavorite)
      );
    } else {
      setIsFavorite((state) => !state);
    }
  };

  const onCreateNote = async () => {
    const newNote: Omit<INoteType, "id"> = {
      color: cardColor,
      title: inputRef.current?.value ?? "",
      isFavorite: isFavorite,
      createdAt: new Date(),
      updatedAt: new Date(),
      description: textareaRef.current?.value ?? "",
    };

    if (toCreate) {
      await handleCreateNote(newNote, clearInputs);
    } else if (note) {
      const updatedNote: INoteType = {
        ...note,
        title: inputRef.current?.value ?? note.title,
        description: textareaRef.current?.value ?? note.description,
        updatedAt: new Date(),
      };
      await handleEditNote?.(updatedNote, false);
    }
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement> | KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        if (inputRef.current) {
          inputRef.current.value += "\n";
        }
      } else {
        e.preventDefault(); // Evita a quebra de linha padrão
        onCreateNote(); // Executa a função ao pressionar Enter
      }
    }
  };

  return (
    <div
      className={`card ${toCreate ? "h-32" : ""}`}
      style={{ backgroundColor: cardColor }}
    >
      <div className="flex">
        <Tooltip
          label={
            toCreate ? "Insira o título da nota" : inputRef.current?.value ?? ""
          }
        >
          <input
            onKeyDown={handleKeyDown}
            placeholder="Insira o título da nota"
            type="text"
            defaultValue={note?.title}
            ref={inputRef}
          />
        </Tooltip>

        {!isFavorite ? (
          <FaRegStar
            size={24}
            cursor={"pointer"}
            onClick={onChangeFavoriteStatus}
          />
        ) : (
          <FaStar
            color={"#FFA000"}
            size={24}
            cursor={"pointer"}
            onClick={onChangeFavoriteStatus}
          />
        )}
      </div>

      <Divider />

      <div className="flex-content">
        <textarea
          onKeyDown={handleKeyDown}
          ref={textareaRef}
          name="Notes"
          defaultValue={note?.description}
          placeholder={
            toCreate
              ? "Criar nota..."
              : "Clique ou arraste o arquivo para esta área para fazer upload"
          }
        />
      </div>

      <div className={`bottom`}>
        <div className="flex ">
          <img
            src="pencil.png"
            style={{ cursor: "pointer", height: 17, width: 17 }}
            className={`${toCreate ? "not-visible" : ""}`}
            onClick={handleClickToEdit}
          />

          <img
            src="painter.png"
            style={{ cursor: "pointer", height: 17, width: 17 }}
            onClick={() => setShowMenuColors(true)}
          />
          <div ref={dropdownRef}>
            {showMenuColors && (
              <DropdownMenuColors
                onChangeNoteColor={onChangeNoteColor}
                toCreate={toCreate}
              />
            )}
          </div>
        </div>
        <CgClose
          size={24}
          cursor={"pointer"}
          className={`${toCreate ? "not-visible" : ""}`}
          onClick={note ? () => handleClickToDelete?.(note) : undefined}
        />
      </div>
    </div>
  );
};
