
import { Environment } from "@/shared/Environment";
import { ITaskType } from "@/shared/types";

import { Api } from "../axios-config";

export type TTaskWithTotalCount = {
    data: ITaskType[];
    totalCount: number;
};

const getAll = async (
    page = 1,
    filter = ""
): Promise<TTaskWithTotalCount | Error> => {
    try {
        const relativeUrl = `/tasks?page=${page}&limit=${Environment.LIMITE_DE_LINHAS}&filter=${filter}`;
        const { data, headers } = await Api.get(relativeUrl);
        if (data)
            return {
                data,
                totalCount: Number(headers["x-total-count"]) || data.length,
            };
        return new Error("Erro ao listar os registos");
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message || "Erro ao listar os registos"
        );
    }
};

const getById = async (id: number): Promise<ITaskType | Error> => {
    try {
        const { data } = await Api.get(`/tasks/${id}`);
        if (data) return data;
        return new Error("Erro ao listar os registos");
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message ||
            "Houve um erro interno, tente novamente"
        );
    }
};

const create = async (
    task: Omit<ITaskType, "id">
): Promise<ITaskType | Error> => {
    try {
        const { data } = await Api.post<ITaskType>("/tasks", task);
        if (data) return data;
        return new Error("Erro ao cadastrar o item");
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
    task: ITaskType
): Promise<void | Error> => {
    try {
        await Api.put(`/tasks/${id}`, task);
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
        await Api.delete(`/tasks/${id}`);
    } catch (error) {
        console.error(error);
        return new Error(
            (error as { message: string }).message ||
            "Houve um erro interno, tente novamente"
        );
    }
};

export const TaskDAO = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};