import axios from "axios";
import type { Todo } from "../types/todos";
import type { Project } from "../types/projects";

const BASE_URL = "http://localhost:8080";
const axiosInstance = axios.create({baseURL: BASE_URL});

export const getTodosIds = async () => {
    return ((await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id))
}

export const getTodos = async (id: number) => {
    return (await axiosInstance.get<Todo>(`todos/${id}`)).data
}

export const getProjects = async (page = 1) => {
    return (await axiosInstance.get<Project[]>(`projects?_page=${page}&limit=3`)).data;
}