import { useState, useEffect } from 'react';

const UseStringDateFormat = (initialDate: string) => {

  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const formatDate = (dateString:string) => {
      const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];

      const [year, month, day] = dateString.split('-');
      const monthName = months[parseInt(month, 10) - 1];
      
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    };
    setFormattedDate(formatDate(initialDate));
  }, [initialDate]);

  return formattedDate;
}

export default UseStringDateFormat;

