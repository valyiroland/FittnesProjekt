import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import axios from 'axios';

// Mockoljuk a react-router-dom-ot
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

jest.mock('axios');

describe('Login component', () => {
  test('displays success message on successful login', async () => {
    axios.post.mockResolvedValueOnce({
      data: { userId: 1, username: 'testuser' },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'Password123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => expect(screen.getByText(/Successful login!/i)).toBeInTheDocument());
  });

  test('handles login error', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: 'Invalid credentials' },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'WrongPassword123' } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument());
  });

  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});
