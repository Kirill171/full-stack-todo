import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';

export default function HomePage() {
  return (
    <main className="bg-white dark:bg-gray-800">
      <Link href="/tasks">Tasks</Link>
      <TaskForm />
      {/* <TaskList tasks={tasks} /> */}
    </main>
  );
}
