function toTitleCase(str: string) {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // Ensure month and day are formatted with leading zeros if necessary
  if (month < 10) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    month = '0' + month;
  }
  if (day < 10) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
};

export { formatDate, toTitleCase };