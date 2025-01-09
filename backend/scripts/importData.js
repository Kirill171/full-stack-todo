import { PrismaClient } from '@prisma/client';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function importUsersWithTasks() {
  const filePath = join(__dirname, 'users_with_tasks.json');
  const users = JSON.parse(readFileSync(filePath, 'utf8'));

  for (const user of users) {
    const createdUser = await prisma.user.create({
      data: {
        email: user.email,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    for (const task of user.tasks) {
      await prisma.task.create({
        data: {
          title: task.title,
          description: task.description,
          isCompleted: task.isCompleted,
          userId: createdUser.id,
        },
      });
    }
  }
  console.log(`Users with tasks data imported from ${filePath}`);
}

importUsersWithTasks();
