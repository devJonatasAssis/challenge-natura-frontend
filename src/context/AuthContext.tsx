/* eslint-disable react-hooks/exhaustive-deps */
import { ModalAuth } from '@/components/ModalAuth/ModalAuth';
import { User } from '@/model/User';
import { api } from '@/services/api.service';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';

interface LoginProps {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  isLogged: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  showAuthModal: () => void;
  hideAuthModal: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthState: AuthState = {
  user: null,
  isLogged: false,
  isLoading: false,
};

export const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  showAuthModal: () => Promise.resolve(),
  hideAuthModal: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { children } = props;
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('@natura:user');
    const token = localStorage.getItem('@natura:token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.authorization = `Bearer ${token}`;
      setIsLogged(true);
    }

    setIsLoading(false);
  }, []);

  const login = async ({ email, password }: LoginProps) => {
    try {
      const response = await api.post('session', { email, password });

      const { token, user } = response.data;

      localStorage.setItem('@natura:token', token);
      localStorage.setItem('@natura:user', JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setUser(user);
      setIsLogged(true);
      queryClient.removeQueries();

      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Falha ao se autenticar');
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('@natura:token');
    localStorage.removeItem('@natura:user');
    setUser(null);
    setIsLogged(false);
    api.defaults.headers.authorization = '';
    router.replace('/login');
  };

  const showAuthModal = () => {
    setIsLoginModalVisible(true);
  };

  const hideAuthModal = () => {
    setIsLoginModalVisible(false);
  };

  const value = useMemo(
    () => ({
      user,
      isLogged,
      login,
      logout,
      showAuthModal,
      hideAuthModal,
      isLoading,
    }),
    [login, logout, showAuthModal, hideAuthModal, isLoading, isLogged, user],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      {isLoginModalVisible && <ModalAuth onCloseModal={hideAuthModal} />}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
