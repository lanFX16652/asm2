export const parseDateToArray = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const _endDate = new Date(endDate)

  while (currentDate <= _endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};
