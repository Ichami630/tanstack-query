import { useIsFetching } from "@tanstack/react-query";
import { useTodos, useTodosIds } from "../services/queries"

export default function Todo() {
    const todoIdsQuery = useTodosIds();
    const isFetching = useIsFetching();

    const todosQueries = useTodos(todoIdsQuery.data)

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
            <p key={id}>id: {id}</p>
        ))}
        <ul>
            {todosQueries.map(({data}) => (
                <li key={data?.id}>
                    <div>Id: {data?.id}</div>
                    <span>
                        <strong>Title:</strong> {data?.title}, {" "}
                        <strong>Description:</strong> {data?.description}
                    </span>
                </li>

            ))}
        </ul>
    </div>
  )
}
