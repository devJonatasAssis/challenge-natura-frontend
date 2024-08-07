import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { Person, ShoppingBagOutlined } from '@mui/icons-material';
import { useState } from 'react';
import Logo from '../../../public/naturaco.svg';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { isLogged, user, showAuthModal } = useAuth();
  const router = useRouter();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const goToCart = () => {
    if (isLogged) {
      router.push('/carrinho');
    } else {
      showAuthModal();
    }
  };

  const menuList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="About" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#FFF',
        boxShadow: 'none',
        height: { xs: 'auto', md: 100 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar
        sx={{
          flexDirection: { xs: 'row', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          px: { xs: 2, md: 3 },
        }}
      >
        {isMobile ? (
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            my={1}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src={Logo} alt="Natura Logo" width={100} height={20} />
            </Box>
            <IconButton
              data-testid="cart-icon-button"
              sx={{
                color: '#464646',
                borderColor: '#464646',
                textTransform: 'capitalize',
              }}
              onClick={goToCart}
            >
              <ShoppingBagOutlined fontSize="large" />
            </IconButton>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Image src={Logo} alt="Natura Logo" width={100} height={20} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                sx={{
                  color: '#464646',
                  borderColor: '#464646',
                  borderRadius: 6,
                  textTransform: 'capitalize',
                  mr: 2,
                }}
                startIcon={<Person />}
                variant="outlined"
              >
                {isLogged ? user?.name : 'Entrar'}
              </Button>

              <IconButton
                data-testid="cart-icon-button"
                sx={{
                  color: '#464646',
                  borderColor: '#464646',
                  textTransform: 'capitalize',
                }}
                onClick={goToCart}
              >
                <ShoppingBagOutlined fontSize="large" />
              </IconButton>
            </Box>
          </>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuList}
      </Drawer>
    </AppBar>
  );
};
