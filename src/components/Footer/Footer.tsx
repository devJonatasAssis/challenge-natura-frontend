import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import Image from 'next/image'; // Ou 'import Logo from './path-to-logo.png';' se você estiver usando CRA
import Logo from '../../../public/natura-branca.svg'; // Certifique-se de ajustar o caminho da sua logo

export const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#E65000',
        color: 'white',
        padding: '20px 0',
        mt: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4} md={3}>
            <Image src={Logo} alt="Natura Logo" width={100} height={20} />
            <Typography variant="h6" gutterBottom mt={2}>
              Sobre Nós
            </Typography>
            <Typography variant="body2">
              Natura é uma empresa brasileira que atua no setor de cosméticos e
              produtos de beleza.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Typography variant="body2">Email: contato@natura.com</Typography>
            <Typography variant="body2">Telefone: (11) 1234-5678</Typography>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h6" gutterBottom>
              Siga-nos
            </Typography>
            <Box display="flex" justifyContent="space-between" width="100px">
              <Link
                href="https://www.facebook.com/naturabroficial/?locale=pt_BR"
                color="inherit"
                aria-label="Facebook"
              >
                <Facebook />
              </Link>
              <Link
                href="https://twitter.com/naturaandco"
                color="inherit"
                aria-label="Twitter"
              >
                <Twitter />
              </Link>
              <Link
                href="https://www.instagram.com/naturabroficial/"
                color="inherit"
                aria-label="Instagram"
              >
                <Instagram />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Natura. Todos os direitos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
