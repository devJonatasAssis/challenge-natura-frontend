import { ModalAuth } from '@/components/ModalAuth/ModalAuth';
import { User } from '@/model/User';
import { api } from '@/services/api.service';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface AuthContextProps {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLogged: boolean;
  showAuthModal: () => void;
  hideAuthModal: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('@natura:user');
    const storedToken = localStorage.getItem('@natura:token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (data: { email: string; password: string }) => {
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

  const showAuthModal = () => {
    setIsLoginModalVisible(true);
  };

  const hideAuthModal = () => {
    setIsLoginModalVisible(false);
  };

  const value = {
    user,
    token,
    login,
    logout,
    isLogged: !!user,
    showAuthModal,
    hideAuthModal,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isLoginModalVisible && <ModalAuth onCloseModal={hideAuthModal} />}
    </AuthContext.Provider>
  );
};
