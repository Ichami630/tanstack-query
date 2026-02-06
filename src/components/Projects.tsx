// import { useProjects } from "../services/queries"

// export default function Projects() {
//   const projects = useProjects(1);
//   return (
//     <div>
//       <p>Query fetch function status: {projects.fetchStatus}</p>
//       <p>Query data status: {projects.status}</p>
//       {projects.data?.map((p) => (
//         <div key={p?.id}>
//           <p>{p?.id}</p>
//           <p>{p?.name}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// pagination with placeholderdata
import { useState } from "react"
import { useNewProjects } from "../services/queries"

export default function Projects() {
  const [ page, setPage ] = useState(1)
  const { isPending, isError, error, data, isFetching, isPlaceholderData } = useNewProjects(page)
  return (
    <div>
      {isPending ? (
        <div>Loading...</div>
      ): isError ? (
        <div>{error.message}</div>
      ) : (
        <div>{data.map((p) => (
          <p key={p.id}>{p.id}: {p.name}</p>
        ))}</div>
      )}

      <span>Current Page: {page}</span>

      <button onClick={()=> setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 1}>Previous Page</button> {' '}
      <button style={{ backgroundColor: 'blue', color: 'white' }}>{page}</button>
      <button onClick={() => {
        // Disable the Next Page button until we know a next page is available
        if(!isPlaceholderData){
          setPage((old) => old + 1)
        }
      }} disabled={isPlaceholderData || data?.length === 0 }>Next Page</button>{' '}

      {/* Show a background fetching indicator */}
      {isFetching ? <span>Loading..</span> : null} {" "}

    </div>
  )
}

