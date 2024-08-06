import { Add, More, Remove } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn;
  name: any;
}

export const QuantityInput = ({ form, name }: Props) => {
  const { setValue, getValues, watch } = form;

  const onIncrement = () => {
    const currentValue = getValues(name);
    setValue(name, Number(currentValue) + 1);
  };

  const onDecrement = () => {
    const currentValue = getValues(name);
    setValue(name, Number(currentValue) - 1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" justifyContent="center" gap={2} alignItems="center">
        <Button
          data-testid="add"
          variant="contained"
          color="primary"
          onClick={onIncrement}
        >
          <Add />
        </Button>
        <Typography variant="h6" gutterBottom>
          {watch(name)}
        </Typography>
        <Button
          data-testid="decrement"
          variant="contained"
          onClick={onDecrement}
        >
          <Remove />
        </Button>
      </Box>
    </Box>
  );
};
