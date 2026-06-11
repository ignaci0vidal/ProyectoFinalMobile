import { AppUser } from '../types/user';

export const initialUsers: AppUser[] = [
  {
    id: 'admin',
    name: 'Admin',
    email: 'admin@mikitchen.com',
    password: '123456',
    role: 'admin',
  },
  {
    id: 'demo',
    name: 'Usuario Demo',
    email: 'demo@mikitchen.com',
    password: '123456',
    role: 'user',
  },
  {
    id: 'usr1',
    name: 'Usuario 1',
    email: 'usr1@mikitchen.com',
    password: '123456',
    role: 'user',
  },
  {
    id: 'usr2',
    name: 'Usuario 2',
    email: 'usr2@mikitchen.com',
    password: '123456',
    role: 'user',
  },
];
