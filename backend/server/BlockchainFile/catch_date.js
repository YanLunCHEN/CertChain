function catchDate (){
    const date_ob = new Date();
    // adjust 0 before single digit date
    const date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    const year = date_ob.getFullYear();
    // current hours
   
    return(year + "-" + month + "-" + date);
}
export default catchDate ;



