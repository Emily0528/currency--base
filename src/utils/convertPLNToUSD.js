export const convertPLNToUSD = (PLN) => {

  if (PLN === undefined) {
    return NaN;
  }

  if (typeof PLN === 'string') {
    return NaN;
  }

  if (typeof PLN !== 'number') {
    return 'Error';
  }

  if (isNaN(PLN)) {
    return NaN;
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  if (PLN < 0) {
    return formatter.format(0).replace(/\u00a0/g, ' ');
  }

  const PLNtoUSD = PLN / 3.5;

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}