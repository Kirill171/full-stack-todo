import { PrismaClient } from '@prisma/client';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function exportUsersWithTasks() {
  const users = await prisma.user.findMany({
    include: {
      tasks: true,
    },
  });

  const filePath = join(__dirname, 'users_with_tasks.json');
  writeFileSync(filePath, JSON.stringify(users, null, 2));
  console.log('Users with tasks data exported!');
}

exportUsersWithTasks();
