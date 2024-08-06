import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuantityInput } from './QuantityInput';
import { useForm, FormProvider } from 'react-hook-form';

interface TestFormValues {
  quantity: number;
}

const TestComponent = () => {
  const methods = useForm<TestFormValues | any>({
    defaultValues: { quantity: 0 },
  });

  return (
    <FormProvider {...methods}>
      <QuantityInput form={methods} name="quantity" />
    </FormProvider>
  );
};

describe('QuantityInput Component', () => {
  it('renders the QuantityInput component correctly', () => {
    render(<TestComponent />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments the value when the increment button is clicked', () => {
    render(<TestComponent />);

    const incrementButton = screen.getByTestId('add');
    fireEvent.click(incrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrements the value when the decrement button is clicked', () => {
    render(<TestComponent />);

    const decrementButton = screen.getByTestId('decrement');
    const incrementButton = screen.getByTestId('add');
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);

    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
