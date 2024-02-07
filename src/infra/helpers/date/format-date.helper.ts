export const formatDate = (date: Date): string => {
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(date);

  return formattedDate.replaceAll('/', '-').replace(',', '');
};
