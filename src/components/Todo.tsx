import { useIsFetching } from "@tanstack/react-query";
import { useTodosIds } from "../services/queries"

export default function Todo() {
    const todoIdsQuery = useTodosIds();
    const isFetching = useIsFetching();

    if(todoIdsQuery.isLoading) {
        return <span>loading..</span>
    }

    if(todoIdsQuery.isError) {
        return <span>an unexpected error occured</span>
    }
  return (
    <div>
        <p>Query fetch function status: {todoIdsQuery.fetchStatus}</p>
        <p>Query data status: {todoIdsQuery.status}</p>
        <p>Global fetching: {isFetching}</p>
        {todoIdsQuery.data?.map((id) => (
            <p key={id}>{id}</p>
        ))}
    </div>
  )
}
