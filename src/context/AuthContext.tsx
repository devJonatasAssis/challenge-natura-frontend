import { User } from '@/model/User';
import { api } from '@/services/api.service';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isLogged: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider = (children: ReactNode) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('@natura:user');
    const token = localStorage.getItem('@natura:token');
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
  }, []);

  const login = async (data: User) => {
    try {
      const response = await api.post('/session', {
        email: data.email,
        password: data.password,
      });

      const { user, token } = response.data;

      setUser(user);
      setToken(token);

      localStorage.setItem('@natura:user', JSON.stringify(user));
      localStorage.setItem('@natura:token', token);
    } catch (error) {
      throw new Error('Falha ao se autenticar');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('@natura:user');
    localStorage.removeItem('@natura:token');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLogged: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
