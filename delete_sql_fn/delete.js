const sql = require('mssql');
let  config ={
    user:'backend',
    password:'test123456',
    server:'114.32.179.20',
    database : 'AU',
    options:{
        trustedConnection : false , 
        encrypt : false, 
        trustServerCertificate: true
    }
}
async function delete_Tx_Sequence(){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .query('DELETE FROM Tx_Squence');
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        console.log(JsonFormat)
        if(JsonFormat.recordset[0]==undefined){
            pool.close();
            return false;
        }
        else{
            pool.close();
            return JsonFormat;
        }
    }catch(err){
        //pool.close();
        console.log(err);
        throw new Error(err);
    }
}


async function delete_Tx_Select(){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .query('DELETE FROM Tx_Select');
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        console.log(JsonFormat)
        if(JsonFormat.recordset[0]==undefined){
            pool.close();
            return false;
        }
        else{
            pool.close();
            return JsonFormat;
        }
    }catch(err){
        //pool.close();
        console.log(err);
        throw new Error(err);
    }
}
try{
    delete_Tx_Sequence();
    delete_Tx_Select();
}catch(err){
console.log(err);
}
