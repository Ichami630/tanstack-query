import { useProjects } from "../services/queries"

export default function Projects() {
  const projects = useProjects(1);
  return (
    <div>
      <p>Query fetch function status: {projects.fetchStatus}</p>
      <p>Query data status: {projects.status}</p>
      {projects.data?.map((p) => (
        <div key={p?.id}>
          <p>{p?.id}</p>
          <p>{p?.name}</p>
        </div>
      ))}
    </div>
  )
}
