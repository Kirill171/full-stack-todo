import { Task } from '@/types/types';
import { fetchTasks } from '@/utils/api/tasks';

export default async function TodoPage() {
  let tasks = await fetchTasks();

  return (
    <section className="my-auto">
      <div className="container">
        <div className="flex justify-center items-center">
          {tasks.map((task: Task) => (
            <div key={task.id}>{task.title}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
