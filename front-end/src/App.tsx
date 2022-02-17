import { useQuery } from "@apollo/react-hooks"
import TodoList from "./screen/TodoList";
import './App.css';
import * as Queries from './constant/queries'

const App = () => {
  const { loading, error, data } = useQuery(Queries.GET_TODOS)

  if (error) {
    return <h1>Something went wrong!</h1>
  }
  if (loading) return <h1>Loading...</h1>

  return (
    <main className="App">
      <h1>TODO list</h1>
      {loading ? null : <TodoList data={data} />}
    </main>
  )
}

export default App;
