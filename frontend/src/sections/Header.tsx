import Link from 'next/link';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeSwitcher from '../components/ThemeSwitcher';

const Header = () => {
  return (
    <header className="bg-neutral-100 dark:bg-[#0d1117] p-4 border-b border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">
          <Link href="/" className="font-bold">
            My Todo App
          </Link>
        </h1>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header;
