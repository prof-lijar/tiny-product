import { User } from '../../types/auth';
import fs from 'fs/promises';
import path from 'path';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');

export const userData = {
  async findByEmail(email: string): Promise<User | null> {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users: User[] = JSON.parse(data);
    return users.find(u => u.email === email) || null;
  },

  async findById(id: string): Promise<User | null> {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users: User[] = JSON.parse(data);
    return users.find(u => u.id === id) || null;
  },

  async save(user: User): Promise<void> {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users: User[] = JSON.parse(data);
    users.push(user);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  },
};
