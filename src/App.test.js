import { render, screen } from '@testing-library/react';
import App from './App';

describe('test app', () => {
  test('renders learn react link', () => {
    render(<App />);
    const titleElement = screen.getByText(/main title/i);
    const btn = screen.getByRole('button');
    const input = screen.getByPlaceholderText(/input value/i)
    expect(titleElement).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    // screen.debug();
    expect(input).toMatchSnapshot();
  });

  test('non-existent element', async() => {
    render(<App />);
    const helloElement = screen.queryByText(/hello/i);
    expect(helloElement).toBeNull();
  });

  test('async', async() => {
    render(<App />);
    // screen.debug();
    const helloElement = await screen.findByText(/dataText/i);
    expect(helloElement).toBeInTheDocument();
    expect(helloElement).toHaveStyle({color: 'red', width: '100%'});
    // screen.debug();
  });
})

// findBy.., findAll.. - для асинхронного использования
// getBy.., getAll.. - должен найти элемент, если не находит - ошибка
// queryBy.., queryAll.. - можем убедиться, что элемента нет - null

// getByText - возвращает объект
// findByText - возвращает объект, завернутый в промис
