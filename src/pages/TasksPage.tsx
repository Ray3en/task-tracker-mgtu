import { useEffect, useState } from 'react'
import '../index.css'
import { fetchTodos } from '../api/todos.api';
import AddForm from '../components/AddForm';
import TaskList from '../components/TaskList';


export type Task = {
  id: number;
  title: string;
  completed: boolean;
};

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
  }, [])

  return (
    <section className='content'>
      {/* Provider - "облако", в которое мы помещаем состояние и сетСтейт для дочерних компонентов  */}
        <AddForm addTask={addTask} />
        {status === 'error' && <h2>Ошибка!</h2>}
        {status === 'loading' && <h2>Загрузка.....</h2>}
        {status === 'success' && <TaskList tasks={tasks} deleteTask={deleteTask} changeTask={changeTask} />}
    </section>
  );
}


export default TasksPage
