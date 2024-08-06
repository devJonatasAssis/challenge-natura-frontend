import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ModalAuth } from './ModalAuth';
import { useAuth } from '@/context/AuthContext';

// Mock das dependências
jest.mock('@/context/AuthContext');
jest.mock('@hookform/resolvers/yup');

const mockUseAuth: any = useAuth as jest.MockedFunction<typeof useAuth>;

describe('ModalAuth Component', () => {
  const onCloseModal = jest.fn();

  beforeEach(() => {
    mockUseAuth.mockReturnValue({
      login: jest.fn().mockResolvedValue({}),
    });
  });

  it('renders the modal component correctly', () => {
    render(<ModalAuth onCloseModal={onCloseModal} />);

    expect(
      screen.getByText('Faça o cadastro ou entre com seu email'),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Email')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Senha')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Entrar')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Nome completo')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Cadastrar e entrar')[0]).toBeInTheDocument();
  });

  it('handles login form submission', async () => {
    const { login } = mockUseAuth();

    render(<ModalAuth onCloseModal={onCloseModal} />);

    fireEvent.change(screen.getAllByLabelText('Email')[0], {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getAllByLabelText('Senha')[0], {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getAllByText('Entrar')[0]);

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
      expect(onCloseModal).toHaveBeenCalled();
    });
  });

  it('handles register form submission', async () => {
    const { login } = mockUseAuth();

    render(<ModalAuth onCloseModal={onCloseModal} />);

    fireEvent.change(screen.getByLabelText('Nome completo'), {
      target: { value: 'Cadastro de Usuário' },
    });
    fireEvent.change(screen.getAllByLabelText('Email')[1], {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getAllByLabelText('Senha')[1], {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByText('Cadastrar e entrar'));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
      expect(onCloseModal).toHaveBeenCalled();
    });
  });
});
