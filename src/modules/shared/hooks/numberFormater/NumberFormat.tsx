function NumberFormat(value: number) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('es-ES').format(value);
  } else {
    return '';
  }
}

export default NumberFormat;