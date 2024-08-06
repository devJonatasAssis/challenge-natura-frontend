import Image from 'next/image';
import product1 from '../../../public/product2.png';
import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';

export const Banner = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      sx={{
        background: '#3b2b4d',
        px: { xs: 1, md: 3 },
        height: { xs: 'auto', md: 575 },
        py: { xs: 3, md: 0 },
        display: 'flex',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Grid item xs={12} md={6}>
        <Typography fontSize={{ xs: 40, md: 60 }} color="#FFF" fontWeight={600}>
          NATURA BEM-ESTAR
        </Typography>
        <Typography
          color="#F8F8F8"
          fontWeight={100}
          fontSize={{ xs: 20, md: 30 }}
        >
          Cuide-se com a gente.
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent={isSmallScreen ? 'center' : 'flex-end'}
        mt={isSmallScreen ? 3 : 0}
      >
        <Image
          src={product1}
          alt="Imagem do Banner inicial"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
};
// import Image from 'next/image';
// import product1 from '../../../public/product2.png';
// import { Grid, Typography, Box, useMediaQuery } from '@mui/material';

// export const Banner = () => {
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   return (
//     <Grid
//       container
//       sx={{
//         background: '#3b2b4d',
//         px: 3,
//         height: { xs: 'auto', md: 575 },
//         py: { xs: 3, md: 0 },
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: { xs: 'column', md: 'row' },
//         textAlign: { xs: 'center', md: 'left' }
//       }}
//     >
//       <Grid item xs={12} md={6}>
//         <Typography
//           fontSize={{ xs: 40, md: 60 }}
//           color="#FFF"
//           fontWeight={600}
//         >
//           NATURA BEM-ESTAR
//         </Typography>
//         <Typography
//           color="#F8F8F8"
//           fontWeight={100}
//           fontSize={{ xs: 20, md: 30 }}
//         >
//           Cuide-se com a gente.
//         </Typography>
//       </Grid>

//       <Grid
//         item
//         xs={12}
//         md={6}
//         display="flex"
//         justifyContent="center"
//         mt={isSmallScreen ? 3 : 0}
//       >
//         <Box sx={{ width: '100%', maxWidth: 500 }}>
//           <Image
//             src={product1}
//             alt="Imagem do Banner inicial"
//             layout="responsive"
//             objectFit="contain"
//           />
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };
