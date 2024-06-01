
const moment = require('moment');



export const dateStringToTimestamp = (dateString) => {

    let fecha = moment(dateString).toDate()
    return moment(fecha).utc()
   
}

export const timeStringToTimestamp = (timeString) => {
 
    let currentdate = moment().format('YYYY-MM-DD');
    let datetimeString = `${currentdate} ${timeString}`;
    let moment_date =  moment(datetimeString).toDate()
    return moment(moment_date).utc()
    
}