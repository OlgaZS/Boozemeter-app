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

module.exports = {
  getDateStartTimestamp,
  getDateEndTimestamp
};
