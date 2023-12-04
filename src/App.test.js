import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import App from './App';

describe('test app', () => {
  test('existing elements', () => {
    render(<App />);
    const titleElement = screen.getByText(/main title/i);
    const btn = screen.getByRole('button');
    const input = screen.getByPlaceholderText(/input value/i);
    expect(titleElement).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    // screen.debug();
    expect(input).toMatchSnapshot();
  });

  test('non-existent element', () => {
    render(<App />);
    const helloElement = screen.queryByText(/hello/i);
    expect(helloElement).toBeNull(); // элемента нет на странице
  });

  test('async', async() => {
    render(<App />);
    // screen.debug();
    const helloElement = await screen.findByText(/dataText/i);
    expect(helloElement).toBeInTheDocument();
    expect(helloElement).toHaveStyle({color: 'red', width: '100%'});
    // screen.debug();
  });

  test('click event', () => {
    render(<App />);
    const btn = screen.getByTestId('toggle-btn');
    expect(screen.queryByTestId('toggle-elem')).toBeNull(); // сначала элемента нет на странице
    fireEvent.click(btn);
    expect(screen.queryByTestId('toggle-elem')).toBeInTheDocument(); // после клика появляется
    fireEvent.click(btn);
    expect(screen.queryByTestId('toggle-elem')).toBeNull(); // после второго клика снова пропадает
  });

  test('change event', async() => {
    render(<App />);
    const input = screen.getByPlaceholderText(/input value/i);
    expect(screen.queryByTestId('value-elem')).toContainHTML('');
    // fireEvent - искусственное конкретное событие
    // fireEvent.input(input, {
    //   target: {value: 'test-value'}
    // });

    // ! userEvent - воспроизводит действия пользователя
    // userEvent.type(input, 'test-value'); - так появляется warning
    await act(async() => {
      await userEvent.type(input, 'test-value');
    })
    expect(screen.queryByTestId('value-elem')).toContainHTML('test-value');
  });
})

// findBy.., findAll.. - для асинхронного использования
// getBy.., getAll.. - должен найти элемент, если не находит - ошибка
// queryBy.., queryAll.. - можем убедиться, что элемента нет - null

// getByText - возвращает объект
// findByText - возвращает объект, завернутый в промис
