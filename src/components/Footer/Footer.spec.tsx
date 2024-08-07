import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('renders the logo, sections, and social media links correctly', () => {
    render(<Footer />);

    const logo = screen.getByAltText('Natura Logo');
    expect(logo).toBeInTheDocument();

    const aboutUs = screen.getByText('Sobre Nós');
    expect(aboutUs).toBeInTheDocument();

    const contact = screen.getByText('Contato');
    expect(contact).toBeInTheDocument();

    const followUs = screen.getByText('Siga-nos');
    expect(followUs).toBeInTheDocument();

    const email = screen.getByText('Email: contato@natura.com');
    expect(email).toBeInTheDocument();

    const phone = screen.getByText('Telefone: (11) 1234-5678');
    expect(phone).toBeInTheDocument();

    const facebookLink = screen.getByLabelText('Facebook');
    expect(facebookLink).toBeInTheDocument();
    expect(facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/naturabroficial/?locale=pt_BR',
    );

    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toBeInTheDocument();
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://twitter.com/naturaandco',
    );

    const instagramLink = screen.getByLabelText('Instagram');
    expect(instagramLink).toBeInTheDocument();
    expect(instagramLink).toHaveAttribute(
      'href',
      'https://www.instagram.com/naturabroficial/',
    );
  });

  it('renders the copyright notice with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const copyrightNotice = screen.getByText(
      `© ${currentYear} Natura. Todos os direitos reservados.`,
    );
    expect(copyrightNotice).toBeInTheDocument();
  });
});
