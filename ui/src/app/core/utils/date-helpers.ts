export const formatDateTime = (epoch: number, format: string = 'MM/DD/YYYY'): string => {
  const date = new Date(epoch);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  format = format.toLowerCase();
  format = format.replace('yyyy', year.toString());
  format = format.replace('mm', month.toString().padStart(2, '0'));
  format = format.replace('dd', day.toString().padStart(2, '0'));
  format = format.replace('hh', hours.toString().padStart(2, '0'));
  format = format.replace('ii', minutes.toString().padStart(2, '0'));

  return format;
}