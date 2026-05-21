import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
type User = {
  id: string;
  username: string;
  email: string;
  bio?: string;
};
const usersFilePath = path.join(process.cwd(), 'data', 'users.json');
let users: User[] = [];
try {
  const fileContent = readFileSync(usersFilePath, 'utf-8');
  users = JSON.parse(fileContent);
} catch (error) {
  console.error('Failed to load users data:', error);
}
export function updateUserProfile(userId: string, updates: Partial<User>): User | null {
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex < 0) return null;
  users[userIndex] = { ...users[userIndex], ...updates };
  try {
    writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save updated user data:', error);
    return null;
  }
  return users[userIndex];
}