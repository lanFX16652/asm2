export const parseDateToArray = (startDate, endDate, isToString) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const _endDate = new Date(endDate)

  while (currentDate <= _endDate) {
    if (isToString) {
      dates.push(new Date(currentDate).toDateString());
    } else {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};
