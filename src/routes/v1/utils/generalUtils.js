
const moment = require('moment-timezone')



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

export const setMomentTimezone = (date) => {
    return moment(date).tz('America/Santiago')
}