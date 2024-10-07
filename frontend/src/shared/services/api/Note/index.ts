
import { Environment } from "@/shared/Environment";
import { INoteType } from "@/shared/types";

import { Api } from "../axios-config";

export type IPaginatedResult<T> = {
    data: T[];
    total: number;
    pages: number;
    itemsPerPage: number;
};

const getAll = async (
    page = 1,
    filter = ""
): Promise<IPaginatedResult<INoteType> | Error> => {
    try {
        const relativeUrl = `/notes?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
        const { data } = await Api.get(relativeUrl);
        console.log("DATA: ", data);
        if (data)
            return data;
        return new Error("Erro ao listar as notas");
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message || "Erro ao listar as notas"
        );
    }
};

const getById = async (id: number): Promise<INoteType | Error> => {
    try {
        const { data } = await Api.get(`/notes/${id}`);
        if (data) return data;
        return new Error("Erro ao listar as notas");
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message ||
            "Houve um erro interno, tente novamente"
        );
    }
};

const create = async (
    note: Omit<INoteType, "id">
): Promise<INoteType | Error> => {
    try {
        const { data } = await Api.post<INoteType>("/notes", note);
        if (data) return data;
        return new Error("Erro ao cadastrar a nota");
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message ||
            "Houve um erro interno, tente novamente"
        );
    }
};

const updateById = async (
    id: number,
    note: INoteType
): Promise<void | Error> => {
    try {
        await Api.put(`/notes/${id}`, note);
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message ||
            "Houve um erro interno, tente novamente"
        );
    }
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await Api.delete(`/notes/${id}`);
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message ||
            "Houve um erro interno, tente novamente"
        );
    }
};

export const NoteDAO = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};