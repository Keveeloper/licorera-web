function NumberFormat(value: number) {
  if (typeof value === 'number') {
    // return new Intl.NumberFormat('es-ES').format(value);
    const formattedValue = value.toFixed(2); // Asegura que siempre haya dos decimales
    return new Intl.NumberFormat('es-ES').format(parseFloat(formattedValue)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  } else {
    return '';
  }
}

export default NumberFormat;