type ApiTodo = {
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchTodos() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1",
  );

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return (await response.json()) as ApiTodo[];
}
