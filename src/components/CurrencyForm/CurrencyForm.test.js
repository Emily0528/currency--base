import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {

  it('should render without crashing', () => {
    render(<CurrencyForm action={() => {}} />);
  });

  it('should run action callback with proper data for multiple test cases', () => {

    // tablica z różnymi przypadkami testowymi
    const testCases = [
      { amount: '100', from: 'PLN', to: 'USD' },
      { amount: '20', from: 'USD', to: 'PLN' },
      { amount: '200', from: 'PLN', to: 'USD' },
      { amount: '345', from: 'USD', to: 'PLN' },
    ];

    for (const testObj of testCases) {

      // stwórz atrapę funkcji
      const action = jest.fn();

      // render komponent
      render(<CurrencyForm action={action} />);

      // znajdź pola formularza
      const amountField = screen.getByTestId('amount');
      const fromField = screen.getByTestId('from-select');
      const toField = screen.getByTestId('to-select');

      // ustaw wartości dla testowanego przypadku
      userEvent.type(amountField, testObj.amount);
      userEvent.selectOptions(fromField, testObj.from);
      userEvent.selectOptions(toField, testObj.to);

      // znajdź przycisk i kliknij
      const submitButton = screen.getByText('Convert');
      userEvent.click(submitButton);

      // sprawdź wywołanie callbacka
      expect(action).toHaveBeenCalledTimes(1);
      expect(action).toHaveBeenCalledWith({
        amount: parseInt(testObj.amount),
        from: testObj.from,
        to: testObj.to
      });

      // odmontuj komponent po każdej iteracji
      cleanup();
    }

  });

});