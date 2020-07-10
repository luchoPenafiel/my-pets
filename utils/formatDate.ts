const MONTH = ['Enero', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const formatDate = (date: string): string => {
  if (date) {
    const dateSplited = date.split('-');
    const newDate = `${dateSplited[2]} ${MONTH[Number(dateSplited[1]) - 1]}/${dateSplited[0]}`;

    return newDate;
  }

  return '';
};

export default formatDate;
