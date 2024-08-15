import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Header, ModalDelete, NoteCard } from "@/shared/components";
import {
  addNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "@/shared/repository";
import { INoteType } from "@/shared/types";
import "@/shared/styles/home.scss";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useNote } from "@/shared/hooks";
import { useTheBounce } from "@/shared/hooks/useTheBounce";
import { useSearchParams } from "react-router-dom";

export const Home: React.FC = () => {
  const [notes, setNotes] = useState<INoteType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const setNote = useNote((state) => state.setNote);
  const isLoading = useNote((state) => state.isLoading);
  const setLoading = useNote((state) => state.setLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theBounce } = useTheBounce();
  const search = useMemo(() => {
    return searchParams.get("filter") || "";
  }, [searchParams]);

  const page = useMemo(() => {
    return Number(searchParams.get("page") || "1");
  }, [searchParams]);

  const onOpen = (note: INoteType) => {
    setIsOpen(true);
    setNote(note);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const handleCreateNote = useCallback(
    async (note: Omit<INoteType, "id">, callback?: () => void) => {
      if (!isLoading) {
        setLoading(false);
        toast.promise(
          addNote(note)
            .then((response) => {
              setNotes((prevNotes) => [...prevNotes, response]);
              callback?.();
            })
            .finally(() => setLoading(false)),
          {
            pending: "Criando Nota...",
            success: `Nota "${note.title}" criada com sucesso! 👌`,
            error: {
              render({ data }) {
                const errorMessage =
                  typeof data === "string" ? data : "Erro ao criar a nota 🤯";
                return data instanceof Error ? data.message : errorMessage;
              },
            },
          }
        );
      }
    },
    []
  );

  const handleDeleteNote = useCallback(
    async (noteId: number) => {
      setLoading(true);

      toast.promise(
        deleteNote(noteId)
          .then(() => {
            setNotes((prevNotes) =>
              prevNotes.filter((note) => note.id !== noteId)
            );
            onClose();
          })
          .finally(() => setLoading(false)),
        {
          pending: "Excluindo nota...",
          success: "Nota excluída com sucesso! 👌",
          error: {
            render({ data }) {
              const errorMessage =
                typeof data === "string" ? data : "Erro ao excluir a nota 🤯";
              return data instanceof Error ? data.message : errorMessage;
            },
          },
        }
      );
    },
    []
  );

  const handleEditNote = useCallback(
    async (note: INoteType, toFavorite?: boolean) => {
      setLoading(true);

      toast.promise(
        updateNote(note)
          .then(() => {
            setNotes((prevNotes) =>
              prevNotes.map((prevNote) =>
                prevNote.id === note.id ? note : prevNote
              )
            );
          })
          .finally(() => setLoading(false)),
        {
          pending: toFavorite
            ? `${
                note.isFavorite ? "Favoritando" : "Removendo dos favoritos a"
              } nota `
            : "Atualizando nota...",
          success: `Nota "${note.title}" atualizada com sucesso! 👌`,
          error: {
            render({ data }) {
              const errorMessage =
                typeof data === "string"
                  ? data
                  : "Erro ao atualizar a nota 🤯";
              return data instanceof Error ? data.message : errorMessage;
            },
          },
        }
      );
    },
    []
  );

  useEffect(() => {
    const onGetAllNotes = async () => {
      setLoading(true);
      theBounce(() => {
        toast.promise(
          getAllNotes(page, search)
            .then((allNotes) => {
              setNotes(allNotes.data);
            })
            .finally(() => setLoading(false)),
          {
            pending:
              search.trim() !== ""
                ? "Pesquisando por nota"
                : "Carregando a lista de notas...",
            success:
              search.trim() !== ""
                ? undefined
                : "Lista de notas carregada com sucesso! 👌",
            error: {
              render({ data }) {
                const errorMessage =
                  typeof data === "string"
                    ? data
                    : "Erro ao carregar a lista de notas 🤯";
                return data instanceof Error ? data.message : errorMessage;
              },
            },
          }
        );
      });
    };

    onGetAllNotes();
  }, [theBounce, search, page]);

  return (
    <>
      <Header
        whenChangingSearchText={(texto) =>
          setSearchParams({ filter: texto, page: "1" }, { replace: true })
        }
        searchText={searchParams.get("filter") ?? ""}
      />
      <main>
        <section className="center">
          <p>Enter para salvar</p>
          <p>Shift + Enter para quebra de linha</p>
          <NoteCard toCreate handleCreateNote={handleCreateNote} />
        </section>

        {notes.length === 0 ? (
          <p>Nenhuma nota cadastrada</p>
        ) : (
          <>
            {notes.filter((note) => note.isFavorite).length > 0 && (
              <article className="center">
                <p>Favoritos</p>

                <div className="list-note">
                  {notes
                    .filter((note) => note.isFavorite)
                    .map((item, index) => (
                      <NoteCard
                        key={index}
                        note={item}
                        handleCreateNote={handleCreateNote}
                        handleClickToDelete={onOpen}
                        handleEditNote={handleEditNote}
                      />
                    ))}
                </div>
              </article>
            )}

            {notes.filter((note) => !note.isFavorite).length > 0 && (
              <article className="center" style={{ paddingBottom: 24 }}>
                <p>Outras</p>

                <div className="list-note">
                  {notes
                    .filter((note) => !note.isFavorite)
                    .map((item, index) => (
                      <NoteCard
                        key={index}
                        note={item}
                        handleCreateNote={handleCreateNote}
                        handleClickToDelete={onOpen}
                        handleEditNote={handleEditNote}
                      />
                    ))}
                </div>
              </article>
            )}
          </>
        )}
        {isOpen && (
          <ModalDelete handleDeleteNote={handleDeleteNote} onClose={onClose} />
        )}
      </main>
    </>
  );
};
