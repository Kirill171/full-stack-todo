import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default function Page() {
  return redirect(`/${routing.locales[0]}`);
}
