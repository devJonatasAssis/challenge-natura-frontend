import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  TextField,
  Toolbar,
} from '@mui/material';
import Image from 'next/image';

import Logo from '../../../public/naturaco.svg';
import { Person, ShoppingBagOutlined } from '@mui/icons-material';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/hooks/useCart';
import Loader from '../Loader/Loader';
import { useDrawerCart } from '@/context/CartDrawerContext';

export const Header = () => {
  const { isLogged, user } = useAuth();
  const { data: cart, isLoading } = useCart(user?.id);
  const { openCart } = useDrawerCart();

  if (isLoading) return <Loader />;

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

        <IconButton
          sx={{
            color: '#464646',
            borderColor: '#464646',
            textTransform: 'capitalize',
            ml: 1,
          }}
          onClick={openCart}
        >
          <Badge badgeContent={cart.total | 0} color="warning">
            <ShoppingBagOutlined fontSize="large" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
