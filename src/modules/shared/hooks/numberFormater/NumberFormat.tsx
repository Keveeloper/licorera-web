import { useState, useEffect } from 'react';

function NumberFormat(value: number) {
  const [formattedValue, setFormattedValue] = useState<string>('');

  useEffect(() => {
    if (typeof value === 'number') {
      const formattedNumber = new Intl.NumberFormat('es-ES').format(value);
      setFormattedValue(formattedNumber);
    } else {
      setFormattedValue('');
    }
  }, [value]);

  return formattedValue;
}

export default NumberFormat;