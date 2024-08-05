import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { PasswordInput } from '../PasswordInput';
import { error } from 'console';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required('Campo obrigatório.')
    .email('Digite um email válido.'),
  password: yup.string().required('Campo obrigatório.'),
});

const registerValidationSchema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .required('Campo obrigatório.')
    .email('Digite um email válido.'),
  password: yup.string().required('Campo obrigatório.'),
});

interface Props {
  onCloseModal: () => void;
}

export const ModalAuth = ({ onCloseModal }: Props) => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const { login } = useAuth();

  const formLogin = useForm<LoginProps>({
    mode: 'all',
    resolver: yupResolver(loginValidationSchema),
  });

  const formRegister = useForm<RegisterProps>({
    mode: 'all',
    resolver: yupResolver(registerValidationSchema),
  });

  const handleLogin = async () => {
    const data = formLogin.getValues();
    try {
      setLoadingRegister(true);

      await login({ email: data.email, password: data.password });

      onCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleRegister = async () => {
    const data = formLogin.getValues();
    try {
      setLoadingLogin(true);

      await login({ email: data.email, password: data.password });

      onCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <Dialog open fullWidth>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} mb={3}>
            <Typography fontSize={24}>
              Faça o cadastro ou entre com seu email
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...formLogin.register('email')}
              label="Email"
              fullWidth
              variant="outlined"
              error={!!formLogin.formState.errors}
              helperText={formLogin.formState.errors.email?.message}
            />
          </Grid>

          <Grid item xs={12}>
            <PasswordInput
              name="password"
              register={formLogin.register}
              label="Senha"
              error={formLogin.formState.errors.password}
              autoComplete=""
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              loading={loadingLogin}
              variant="contained"
              size="large"
              fullWidth
              color="success"
              sx={{ height: 50 }}
              onClick={handleLogin}
            >
              Entrar
            </LoadingButton>
          </Grid>

          <Grid item xs={12}>
            <Divider>Ou faça o cadastro</Divider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...formRegister.register('name')}
              label="Nome completo"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              {...formRegister.register('email')}
              label="Email"
              fullWidth
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <PasswordInput
              name="password"
              register={formRegister.register}
              label="Senha"
              error={formRegister.formState.errors.password}
              autoComplete=""
            />
          </Grid>

          <Grid item xs={12}>
            <LoadingButton
              sx={{ height: 50 }}
              variant="contained"
              color="primary"
              fullWidth
            >
              Cadastrar e entrar
            </LoadingButton>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
