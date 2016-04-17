/**
 * @param obj
 * @returns {boolean}
 */
var isObjectEmpty = function(obj) {
  // because Object.keys(new Date()).length === 0;
  // we have to do some additional check
  return Object.keys(obj).length === 0 && JSON.stringify(obj) === JSON.stringify({});
};

module.exports.isObjectEmpty = isObjectEmpty;

/**
 * Convert Date to String using ISO format
 * @param date
 * @returns {string}
 */
var getFormattedDayString = function(date){
  return date.toISOString();
};

module.exports.getFormattedDayString = getFormattedDayString;