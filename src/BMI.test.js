import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BMI from './BMI';

describe('BMI Component - Form Functionality', () => {
  test('renders the form with height, weight, and gender inputs', () => {
    render(<BMI />);

    // Check if all form fields are rendered
    expect(screen.getByLabelText(/Height \(cm\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight \(kg\)/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gender/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Clear/i })).toBeInTheDocument();
  });

  test('calculates BMI and displays the result when valid inputs are given', async () => {
    render(<BMI />);
  
    // Fill out the form with valid values
    fireEvent.change(screen.getByLabelText(/Height \(cm\)/), { target: { value: '170' } });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\)/), { target: { value: '70' } });
  
   
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));
  

    await waitFor(() => {
      // Check if BMI result is shown
      expect(screen.getByText(/Your BMI is/)).toBeInTheDocument();
      expect(screen.getByText(/Category:/)).toBeInTheDocument();
      expect(screen.getByText(/Normal weight/)).toBeInTheDocument();
    });
  });

  test('displays an error message when invalid height or weight is entered', async () => {
    render(<BMI />);

   
    fireEvent.change(screen.getByLabelText(/Height \(cm\)/), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\)/), { target: { value: '' } });

    
    fireEvent.click(screen.getByRole('button', { name: /Calculate/i }));

   
    await waitFor(() => {
      expect(screen.getByText(/Please enter valid height and weight values/)).toBeInTheDocument();
    });
  });

  test('clears the form when the "Clear" button is clicked', () => {
    render(<BMI />);

   
    fireEvent.change(screen.getByLabelText(/Height \(cm\)/), { target: { value: '170' } });
    fireEvent.change(screen.getByLabelText(/Weight \(kg\)/), { target: { value: '70' } });

    
    fireEvent.click(screen.getByRole('button', { name: /Clear/i }));

    // Check that all fields are cleared
    expect(screen.getByLabelText(/Height \(cm\)/).value).toBe('');
    expect(screen.getByLabelText(/Weight \(kg\)/).value).toBe('');
  });
}); 
