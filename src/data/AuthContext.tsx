import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { initialUsers } from './initialUsers';
import { AppUser } from '../types/user';

type SignupData = {
    name: string;
    email: string;
    password: string;
};

type UpdateProfileData = {
    name: string;
    email: string;
    password?: string;
};

type AuthContextValue = {
    users: AppUser[];
    currentUser: AppUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    signup: (data: SignupData) => boolean;
    updateProfile: (data: UpdateProfileData) => boolean;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_VERSION = 'v1';
const USERS_STORAGE_KEY = `@proyecto_final_mobile_users_${STORAGE_VERSION}`;

const mergeStoredUsers = (storedUsers: AppUser[]) => {
    const usersByEmail = new Map<string, AppUser>();

    initialUsers.forEach((user) => {
        usersByEmail.set(user.email.toLowerCase(), user);
    });

    storedUsers.forEach((user) => {
        usersByEmail.set(user.email.toLowerCase(), user);
    });

    return Array.from(usersByEmail.values());
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [users, setUsers] = useState<AppUser[]>(initialUsers);
    const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
    const [hasLoadedStorage, setHasLoadedStorage] = useState(false);

    useEffect(() => {
        const loadUsersFromStorage = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem(USERS_STORAGE_KEY);

                if (storedUsers) {
                    setUsers(mergeStoredUsers(JSON.parse(storedUsers)));
                }
            } catch (error) {
                console.log('Error al cargar usuarios desde AsyncStorage:', error);
            } finally {
                setHasLoadedStorage(true);
            }
        };

        loadUsersFromStorage();
    }, []);

    useEffect(() => {
        if (!hasLoadedStorage) return;

        const saveUsersInStorage = async () => {
            try {
                await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
            } catch (error) {
                console.log('Error al guardar usuarios en AsyncStorage:', error);
            }
        };

        saveUsersInStorage();
    }, [users, hasLoadedStorage]);

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

    const updateProfile = ({
        name,
        email,
        password,
    }: UpdateProfileData): boolean => {
        if (!currentUser) return false;

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedPassword = password?.trim();

        if (!normalizedName || !normalizedEmail) {
            Alert.alert('Error', 'Completá nombre y email.');
            return false;
        }

        if (!normalizedEmail.includes('@')) {
            Alert.alert('Error', 'Ingresá un email válido.');
            return false;
        }

        if (normalizedPassword && normalizedPassword.length < 6) {
            Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
            return false;
        }

        const emailAlreadyExists = users.some(
            (user) =>
                user.id !== currentUser.id &&
                user.email.toLowerCase() === normalizedEmail
        );

        if (emailAlreadyExists) {
            Alert.alert('Error', 'Ya existe un usuario con ese email.');
            return false;
        }

        const updatedUser: AppUser = {
            ...currentUser,
            name: normalizedName,
            email: normalizedEmail,
            password: normalizedPassword || currentUser.password,
        };

        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user.id === currentUser.id ? updatedUser : user
            )
        );
        setCurrentUser(updatedUser);

        Alert.alert('Perfil actualizado', 'Tus datos se guardaron correctamente.');
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
            updateProfile,
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
