import { AppBar, Box, Button, TextField, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

import Logo from '../../../public/naturaco.svg';
import { Person } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { userAgent } from 'next/server';

export const Header = () => {
  const { isLogged, user } = useAuth();
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FFF',
        boxShadow: 'none',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar>
        <Image src={Logo} alt="Natura Logo" />

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            placeholder="o que está buscando hoje?"
            size="small"
            sx={{ width: 500 }}
            variant="standard"
          />
        </Box>

        <Button
          sx={{
            color: '#464646',
            borderColor: '#464646',
            borderRadius: 6,
            textTransform: 'capitalize',
          }}
          startIcon={<Person />}
          variant="outlined"
        >
          {isLogged ? user?.name : 'Entrar'}
        </Button>
      </Toolbar>
    </AppBar>
    // <h1>Oi</h1>
  );
};
