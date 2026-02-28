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
  it('should display same value when from and to are the same', () => {
    const testCases = [
        { from: 'PLN', to: 'PLN', amount: 123, expected: 'PLN 123.00 = PLN 123.00' },
        { from: 'USD', to: 'USD', amount: 50, expected: '$50.00 = $50.00' },
    ];

    for (const testObj of testCases) {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);
    
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent(testObj.expected);

        cleanup();
    }
  });
  it('should display "Wrong value..." for negative amount', () => {
    const testCases = [
        { from: 'PLN', to: 'USD', amount: -100 },
        { from: 'USD', to: 'PLN', amount: -50 },
        { from: 'PLN', to: 'PLN', amount: -123 },
        { from: 'USD', to: 'USD', amount: -12 },
    ];

    for (const testObj of testCases) {
        render(<ResultBox from={testObj.from} to={testObj.to} amount={testObj.amount} />);

        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value...');

        cleanup();
    }
  });

});