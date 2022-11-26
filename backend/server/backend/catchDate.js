function catchDateTime(){
    const date_ob = new Date();
    // adjust 0 before single digit date
    const date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    const year = date_ob.getFullYear();
    // current hours
    const hours = date_ob.getHours();
    // current minutes
    const minutes = date_ob.getMinutes();
    // current seconds
    const seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
};
function catchDate(){
    const date_ob = new Date();
    // adjust 0 before single digit date
    const date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    const year = date_ob.getFullYear();
    // current hours
    const hours = date_ob.getHours();
    // current minutes
    const minutes = date_ob.getMinutes();
    // current seconds
    const seconds = date_ob.getSeconds();
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    return(year + "-" + month + "-" + date);
};

export  { catchDateTime,catchDate }


