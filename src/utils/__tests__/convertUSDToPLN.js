import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from '../../components/ResultBox/ResultBox';

describe('Component ResultBox', () => {

  it('should render proper conversion info for multiple amounts (USD -> PLN)', () => {

    const testCases = [
        { amount: 10, expected: '$10.00 = PLN 35.00' },
        { amount: 50, expected: '$50.00 = PLN 175.00' },
        { amount: 100, expected: '$100.00 = PLN 350.00' },
        { amount: 123, expected: '$123.00 = PLN 430.50' },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);

      const output = screen.getByTestId('output');
      expect(output).toHaveTextContent(testObj.expected);

      // odmontuj komponent po każdej iteracji
      cleanup();
    }

  });

});