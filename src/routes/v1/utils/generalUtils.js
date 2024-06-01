
const moment = require('moment');



export const dateStringToTimestamp = (dateString) => {
    
    let timestamp = moment.utc(dateString).format('YYYY-MM-DD HH:mm:ss');
    return new Date(timestamp)
}

export const timeStringToTimestamp = (timeString) => {
 
    let currentdate = moment.utc().format('YYYY-MM-DD');
    let datetimeString = `${currentdate} ${timeString}`;
    let time = moment.utc(datetimeString).format('YYYY-MM-DD HH:mm:ss');
    return new Date(time)
}