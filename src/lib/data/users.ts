import fs from 'fs/promises';
import path from 'path';
import { User } from '@/types/auth';

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    // If file doesn't exist, return empty array
    return [];
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find(user => user.email === email) || null;
}

export async function saveUsers(users: User[]): Promise<void> {
  await fs.mkdir(path.dirname(USERS_FILE), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  const users = await getUsers();
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  await saveUsers(users);
  return newUser;
}
