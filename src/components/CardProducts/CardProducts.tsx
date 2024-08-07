import { numberFormat } from '@/utils/numberFormat';
import { FavoriteBorder, Star } from '@mui/icons-material';
import { Box, Card, Chip, IconButton, Typography } from '@mui/material';
import Image from 'next/image';

interface Props {
  image: string;
  name: string;
  brand: string;
  price: number;
  isLaunch: boolean;
}

interface ICardProps {
  props: Props;
  onClick: () => void;
}

export const CardProducts = ({ props, onClick }: ICardProps) => {
  return (
    <Box sx={{ cursor: 'pointer' }} onClick={onClick}>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          {props.isLaunch && <Chip label="Lançamento" color="success" />}
          <IconButton sx={{ ml: 'auto' }}>
            <FavoriteBorder />
          </IconButton>
        </Box>

        <Box display="flex" justifyContent="center">
          <Image src={props.image} alt={props.name} width={300} height={275} />
        </Box>
      </Card>

      <Box display="flex" justifyContent="space-between" mt={2} mb={1}>
        <Typography color="#a8a8a8">{props.brand}</Typography>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Star color="warning"></Star>
          <Typography>5.0</Typography>
        </Box>
      </Box>

      <Typography>{props.name}</Typography>
      <Typography mt={3} fontSize={18} fontWeight={700}>
        R$ {numberFormat(props.price)}
      </Typography>
    </Box>
  );
};
