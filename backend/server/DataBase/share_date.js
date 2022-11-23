const {Calendar, CalendarTypes} = require('calendar2');
function catchDate (){

    return (new Promise((resolve, reject) => {
        const date_ob = new Date();
        // adjust 0 before single digit date
        const date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        const year = date_ob.getFullYear();
        // current hours
        resolve(year + "-" + month + "-" + date)
    }))
}

async function produceDate(add_date){
    let date = await catchDate();
    console.log(date);
    const cal = new Calendar(date); // 当前时间
    cal.add(add_date ,CalendarTypes.DAY );  
    return (`${cal.getFullYear()}-${cal.getMonth()+1}-${cal.getDate()}`); 
   
         
} 
module.exports = {produceDate}