import { fireEvent, render, screen } from'@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App'
import TodoTable from'./TodoTable';

// insert todo into todotable and test it
test('renders todotable', () => {
  const row = [
    {desc: 'Go to coffee', date: '5.11.2022'}
  ];
  render(<TodoTable todos={row} />);
  const tablecell = screen.getByText(/go to coffee/i);
  expect(tablecell).toBeInTheDocument();
});

// Add a todo to todotable and test added todo
test('add todo', () => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, {target: {value: 'Go for tea' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, {target: {value: '6.11.2022'}});
  const button = screen.getByText('Add');
  fireEvent.click(button);
  const tablecell = screen.getByText(/go for tea/i);
  expect(tablecell).toBeInTheDocument();
});

// Add a todo to todotable and test added todo
// then click clear button and test if added todo has been cleared
test('clear todos', () => {
  render(<App />);
  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, {target: {value: 'Clear todos' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, {target: {value: '6.11.2022'}});
  const button = screen.getByText('Add');
  fireEvent.click(button);
  const tablecell = screen.getByText(/clear todos/i);
  expect(tablecell).toBeInTheDocument();
  const clear = screen.getByText('Clear');
  fireEvent.click(clear);
  const empty = screen.queryByText(/clear todos/i);
  expect(empty).not.toBeInTheDocument();
});