import { useEffect, useState } from 'react'
import Header from './Header'
import '../index.css'
import TaskList from './TaskList';
import AddForm from './AddForm';
import { ThemeContext } from '../context/themeContext';
import { fetchTodos } from '../api/todos.api';


export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

// const defaultTasks: Task[] = [
//   { id: '1', title: 'Title 1', done: true },
//   { id: '2', title: 'Title 2', done: false },
//   { id: '3', title: 'Title 3', done: true },
// ]

function App() {
  const apiUrl = import.meta.env.VITE_API_URL

  const [tasks, setTasks] = useState<Task[]>([]);
  // Состояние для переключение контеста
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title: title,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id: number) => {
    const changedTasks = tasks.filter((task) => task.id !== id)
    setTasks(changedTasks)
  }

  const changeTask = (id: number) => {
    const changedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = !task.completed
      }
      return task
    })
    setTasks(changedTasks)
  }

  const fetchData = async () => {
    setStatus('loading');
    try {
      const items = await fetchTodos();
      setTasks(items);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  useEffect(() => {
    // const savedTasks = localStorage.getItem('tasks')
    // setTasks(JSON.parse(savedTasks ?? '[]'))
    // fetchData()
    fetchData()
    console.log(apiUrl)
  }, [])


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      {/* Provider - "облако", в которое мы помещаем состояние и сетСтейт для дочерних компонентов  */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Header />
        <AddForm addTask={addTask} />
        {status === 'error' && <h2>Ошибка!</h2>}
        {status === 'loading' && <h2>Загрузка.....</h2>}
        {status === 'success' &&  <TaskList tasks={tasks} deleteTask={deleteTask} changeTask={changeTask} />}
        {/* { 1 === 1 ? <p>1</p> : <p>2</p>}
        <p>{1===1 ? '1' : '2'}</p> */}
      </ThemeContext.Provider>
    </>
  );
}


export default App
