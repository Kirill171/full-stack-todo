'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const t = useTranslations('LocalSwitcher');
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: string) => {
    const newPathname = pathname.replace(
      /^\/[a-z]{2}/,
      `/${language}`
    );
    router.push(newPathname);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative ">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 px-4 py-2 text-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition border border-gray-300 dark:border-gray-700 rounded-md"
      >
        <span role="img" aria-label="Globe">
          🌐
        </span>
        <span>{t('label')}</span>
      </button>

      {isOpen && (
        <div className="absolute mt-0 left-1/2 transform -translate-x-1/2 w-40 bg-white dark:bg-gray-800  rounded-md shadow-lg z-10">
          <button
            onClick={() => handleLanguageChange('en')}
            className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-700 transition"
          >
            <span className="mx-auto">English</span>
          </button>
          <button
            onClick={() => handleLanguageChange('ru')}
            className="flex items-center w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-700 transition"
          >
            <span className="mx-auto">Русский</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
