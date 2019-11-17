const getDateStartTimestamp = ms => {
  const dateStart = new Date(ms);
  dateStart.setHours(0, 0, 0, 0);
  return dateStart.getTime();
};

const getDateEndTimestamp = ms => {
  const dateEnd = new Date(ms);
  dateEnd.setHours(23, 59, 59, 999);
  return dateEnd.getTime();
};

/* date field convert it to
        formatted string like '2019-11-03'.
        hours, seconds etc. are cut off from this string */
const getFormattedDateString = date => {
  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2)
  );
};

module.exports = {
  getDateStartTimestamp,
  getDateEndTimestamp,
  getFormattedDateString
};
