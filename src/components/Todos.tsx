
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTodo } from '../services/mutations';
import type { Todo } from '../types/todos';
import { useTodos, useTodosIds } from '../services/queries';

export default function Todos() {
    const todoIdsQuery = useTodosIds();
    const createTodoMutation = useCreateTodo();
    
    const {register, handleSubmit} = useForm<Todo>();
    
    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
    }
    
    const todosQueries = useTodos(todoIdsQuery.data)
    return (
        <>
            <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
                <h4>New Todo:</h4>
                <input type="text" placeholder='title' {...register("title")} />
                <br />
                <input type="text" placeholder='description' {...register('description')} />
                <br />
                <input type="submit"
                 value={createTodoMutation.isPending ? 'creating...':'create todo'}
                 disabled={createTodoMutation.isPending} />
            </form>
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
        </>
    )
}
