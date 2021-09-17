/**
 * 
 * @param {Number} hour 
 * @returns {Array} - an array where hour is converted to 12 hour format (array[11,"AM"])
 */

function changeHourFormat(hour) {
    let array = new Array();
    if (hour > 12) {
        array.push(hour - 12);
        array.push("PM");
    } else {
        array.push(hour);
        array.push("AM");
    }

    return array;
}


/**
 * 
 * @param {Number} minute 
 */
function fixMinute(minute) {
    if (minute <= 10) {
        minute = minute.toString();
        const zero = "0";
        let answer = zero + minute;

        return answer;
    } else {
        return minute;
    }
}

/**
 * 
 * @returns {String} - returns time (1:03 AM, 3:34 PM)
 */
module.exports.getTime = () => {
    const currentDate = new Date();
    let AMorPM = changeHourFormat(currentDate.getHours());
    let time = AMorPM[0] + ":" + fixMinute(currentDate.getMinutes()) + ` ${AMorPM[1]}`;

    return time;
} ;