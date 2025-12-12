import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders App with LikeDislike and RunningClock components', () => {
  render(<App />);
  
  // 檢查 LikeDislike 組件是否存在（使用精確的文字匹配，避免匹配到 Dislike）
  const likeButton = screen.getByText(/^Like /);
  expect(likeButton).toBeInTheDocument();
  expect(likeButton).toHaveClass('like-button');
  
  // 檢查 RunningClock 組件是否存在（檢查 START 按鈕）
  const startButton = screen.getByRole('button', { name: /^START$/i });
  expect(startButton).toBeInTheDocument();
});

