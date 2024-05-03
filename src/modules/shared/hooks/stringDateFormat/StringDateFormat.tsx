const StringDateFormat = (initialDate: string | undefined) => {
  const formatDate = (dateString: string) => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const [year, month, day] = dateString.split('-');
    const monthName = months[parseInt(month, 10) - 1];
    return `${monthName} ${parseInt(day, 10)}, ${year}`;
  };

  if (initialDate && typeof initialDate === 'string') {
    return formatDate(initialDate);
  } else {
    return ""; // O puedes manejar este caso de otra manera según tu lógica
  }
};

export default StringDateFormat;

