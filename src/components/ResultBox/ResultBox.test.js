import ResultBox from './ResultBox';
import { render, screen, cleanup  } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it('should display proper conversion info for multiple amounts (PLN -> USD)', () => {

    const testCases = [
      { amount: 50, expected: 'PLN 50.00 = $14.29' },
      { amount: 100, expected: 'PLN 100.00 = $28.57' },
      { amount: 200, expected: 'PLN 200.00 = $57.14' },
      { amount: 345, expected: 'PLN 345.00 = $98.57' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);

      cleanup();
    }

  });

});