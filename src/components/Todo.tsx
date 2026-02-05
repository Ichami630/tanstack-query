import { useTodosIds } from "../services/queries"

export default function Todo() {
    const todoIdsQuery = useTodosIds();

    if(todoIdsQuery.isLoading) {
        return <span>loading..</span>
    }

    if(todoIdsQuery.isError) {
        return <span>an unexpected error occured</span>
    }
  return (
    <div>
        {todoIdsQuery.data?.map((id) => (
            <p key={id}>{id}</p>
        ))}
    </div>
  )
}
