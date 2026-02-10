
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from '../services/mutations';
import type { Todo } from '../types/todos';
import { useTodos, useTodosIds } from '../services/queries';

export default function Todos() {
    const todoIdsQuery = useTodosIds();
    const createTodoMutation = useCreateTodo();
    
    //create todo
    const {register, handleSubmit} = useForm<Todo>();
    
    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
    }
    //update todo
    const updateTodoMutation = useUpdateTodo();

    const handleMarkAsDoneSubmit = (data: Todo | undefined) => {
        if(data){
            updateTodoMutation.mutate({...data, checked: true})
        }
    }

    //delete todo
    const deleteTodoMutation = useDeleteTodo();
    const handleDeleteTodo = async (id: number) => {
        try {
            await deleteTodoMutation.mutateAsync(id)
        } catch (error) {
            console.error(error)
        }finally{
            alert("delete successfully")
        }
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
                    <div>
                        <button
                        onClick={() => handleMarkAsDoneSubmit(data)}
                        disabled={data?.checked}>
                            {data?.checked ? 'Done': 'Mark as done'}
                        </button>

                        {data?.id && (
                            <button
                            onClick={() => handleDeleteTodo(data.id!)}
                            >
                                {deleteTodoMutation.isPending && deleteTodoMutation.variables === data.id
                                    ? 'Deleting...':'Delete'
                                }
                            </button>
                        )}
                    </div>
                </li>

            ))}
        </ul>
        </>
    )
}
