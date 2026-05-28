import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { initialUsers } from './initialUsers';
import { AppUser } from '../types/user';

type SignupData = {
    name: string;
    email: string;
    password: string;
};

type AuthContextValue = {
    users: AppUser[];
    currentUser: AppUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    signup: (data: SignupData) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<AppUser[]>(initialUsers);
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null);

    const login = (email: string, password: string): boolean => {
        const normalizedEmail = email.trim().toLowerCase();

        const foundUser = users.find(
            (user) =>
                user.email.toLowerCase() === normalizedEmail &&
                user.password === password
        );

        if (!foundUser) {
            Alert.alert('Error', 'Email o contraseña incorrectos.');
            return false;
        }

        setCurrentUser(foundUser);
        return true;
    };

    const signup = ({ name, email, password }: SignupData): boolean => {
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedName || !normalizedEmail || !password) {
            Alert.alert('Error', 'Completá todos los campos.');
            return false;
        }

        if (!normalizedEmail.includes('@')) {
            Alert.alert('Error', 'Ingresá un email válido.');
            return false;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }

        const emailAlreadyExists = users.some(
            (user) => user.email.toLowerCase() === normalizedEmail
        );

        if (emailAlreadyExists) {
            Alert.alert('Error', 'Ya existe un usuario con ese email.');
            return false;
        }

        const newUser: AppUser = {
            id: `user-${Date.now()}`,
            name: normalizedName,
            email: normalizedEmail,
            password,
            role: 'user',
        };

        setUsers((prevUsers) => [...prevUsers, newUser]);
        setCurrentUser(newUser);

        return true;
    };

    const logout = () => {
        setCurrentUser(null);
    };

    const value = useMemo(
        () => ({
            users,
            currentUser,
            isAuthenticated: currentUser !== null,
            login,
            signup,
            logout,
        }),
        [users, currentUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }

    return context;
};