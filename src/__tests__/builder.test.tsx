import {render, screen} from '@testing-library/react';
import HomePage from '@/app/page';

describe('HomePage', () => {
  it('renders CTA', () => {
    render(<HomePage />);
    expect(screen.getByText(/Product Tool Builder/i)).toBeInTheDocument();
  });
});