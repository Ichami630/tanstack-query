import { useQueries, useQuery } from "@tanstack/react-query";
import { getTodos, getTodosIds } from "./api";

export function useTodosIds () {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getTodosIds, //must return a promise
    });
}

export function useTodos(ids: (number | undefined)[] | undefined) {
    return useQueries({
        queries: (ids ?? []).map((id) => {
            return {
                queryKey: ["todo", id],
                queryFn: () => getTodos(id!)
            }
        })
    })
}