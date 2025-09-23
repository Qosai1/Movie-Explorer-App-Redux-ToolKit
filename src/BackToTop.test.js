import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BackToTop from './Component/BackToTop';

// helper: simulate scroll in jsdom
function setScroll(y) {
  Object.defineProperty(window, 'pageYOffset', { value: y, configurable: true });
  Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
  window.dispatchEvent(new Event('scroll'));
}

beforeEach(() => {
  // jsdom doesn't implement scrollTo; mock it
  window.scrollTo = jest.fn();
  setScroll(0);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('hidden before threshold', () => {
  render(<BackToTop />);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('appears only when scrollY > 400', () => {
  render(<BackToTop />);

  setScroll(400);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();

  setScroll(401);
  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('hides again when scrolling back up', () => {
  render(<BackToTop />);

  setScroll(500);
  expect(screen.getByRole('button')).toBeInTheDocument();

  setScroll(100);
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('clicking scrolls smoothly to the top', async () => {
  const user = userEvent.setup();
  render(<BackToTop />);

  setScroll(450);
  await user.click(screen.getByRole('button'));

  expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
});
