import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(`./Components/AllPeeps`, () => {
  return function () {
    return <p>Mock AllPeeps Component</p>
  }
})

jest.mock(`./Components/Header`, () => {
  return function () {
    return <p>Mock Header Component</p>
  }
})

describe(`Tests for App component`, () => {
  beforeEach(() => {
    render(<App />);
  });

  describe(`Render tests`, () => {
    test(`it should render the AllPeeps component`, () => {
      const mockAllPeeps = screen.getByText(/Mock AllPeeps Component/i);
      expect(mockAllPeeps).toBeInTheDocument();
    })

    test(`it should render the Header component`, () => {
      const mockHeader = screen.getByText(/Mock Header Component/i);
      expect(mockHeader).toBeInTheDocument();
    })
  })
})
