
const moment = require('moment');



export const dateStringToTimestamp = (dateString) => {
    
    let timestamp = moment(dateString).format('YYYY-MM-DD HH:mm:ss');
    return new Date(timestamp)
}

export const timeStringToTimestamp = (timeString) => {
 
    let currentdate = moment().format('YYYY-MM-DD');
    let datetimeString = `${currentdate} ${timeString}`;
    let time = moment(datetimeString).format('YYYY-MM-DD HH:mm:ss');
    return new Date(time)
}