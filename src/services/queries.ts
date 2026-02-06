import { useInfiniteQuery, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct, getProducts, getProjects, getTodos, getTodosIds } from "./api";
import type { Products } from "../types/products";

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

//pagination queries
export function useProjects(page: number) {
    return useQuery({
        queryKey: ["project", {page}],
        queryFn: () => getProjects(page),
    })
}

//pagination with placeholderData
export function useNewProjects(page: number) {
    return useQuery({
        queryKey: ['newProject', page],
        queryFn: () => getProjects(page),
        placeholderData: (previousData) => previousData, // or simply keepPreviousData
        // keepPreviousData is deprecated in v5 in favor of placeholderData
    })
}

//infinite queries
export function useProducts() {
    return useInfiniteQuery({
        queryKey: ['Products'],
        queryFn: getProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage, _, lastPageParam) => {
            if(lastPage.length === 0) {
                return undefined;
            }
            return lastPageParam + 1;
        },
        getPreviousPageParam: (_, __, firstPageParam) => {
            if(firstPageParam <= 1) {
                return undefined;
            }
            return firstPageParam - 1;
        }
    })
}

//get product by id
export function useProduct(id: number | null) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["Product", {id}],
        queryFn: () => getProduct(id!),
        enabled: !!id,
        placeholderData: () => {
            const cachedProducts  = (
                queryClient.getQueryData(["Products"]) as {
                    pages: Products[] | undefined;
                }
            )?.pages?.flat(2);

            if (cachedProducts) {
                return cachedProducts.find((item) => item.id === id)
            }
        },
    })
}