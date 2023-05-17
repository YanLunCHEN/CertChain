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
//------------------------------User--------------------------------------------
//新增User Account 
async function InsertTOAccount(name,email){
    try{
        let pool = await sql.connect(config)
        await pool.request()
                    .input('Names',`${name}`)
                    .input('Email',`${email}`)
                    .input('figure','User')
                    .input('hash',null)
                    .query('INSERT INTO Account VALUES(@Names,@Email,@figure,@hash)')
        pool.close(); 
        return true;
       
    }catch(err){
        console.log(err);
    }
}
// 查詢 Account
async function selectAccount(name,Email){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .input('Email',sql.Char,`${Email}`)
                        .query('select * from Account where Email=@Email');
        
        //console.log(JSON.parse(JSON.stringify(resultado)))
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        pool.close();
        if(JsonFormat.recordset[0]==undefined){
          InsertTOAccount(name,Email);
          return false;
        }
        else{
            return true;
        }
    }catch(err){
        console.log(err)
    }
}
//新增權限前先看有無帳號
async function SelectAccountForApply(respondent){
        try{
            let pool = await sql.connect(config);
            const resultado = await pool.request()
                            .input('Email',sql.Char,`${respondent}`)
                            .input('figure',sql.Char,'User')
                            .query('select * from Account where Email=@Email  AND figure=@figure');
            const JsonFormat = JSON.parse(JSON.stringify(resultado))
            if(JsonFormat.recordset[0]== undefined){
                pool.close();
                return false;
            }
            else{
                pool.close();
                return true;
                
            }
        }catch(error){
            throw new Error(err);
        }
}


//同意查看證書
async function insertAgreeselect(Applications,respondent,timein,timeout){
    try{
        let pool = await sql.connect(config);
        await pool.request()
                        .input('OwnerEmail',sql.VarChar,`${Applications}`)
                        .input('SelectEmail',sql.VarChar,`${respondent}`)
                        .input('Time_in',sql.Char,`${timein}`)
                        .input('Time_out',sql.Char,`${timeout}`)
                        .query('INSERT INTO dbo.Tx_Select VALUES (@OwnerEmail,@SelectEmail,@Time_in,@Time_out)');
        pool.close();                        
        return true; 
    }catch(err){
        console.log(err);
        throw new Error(err);
        
    }
}
//證書持有者有多少證書
async function select_all_owner(Email){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .input('Email',sql.Char,`${Email}`)
                        .query('select * from  Tx_Squence where Email=@Email ');
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        if(JsonFormat.recordset[0]==undefined){
            pool.close();
            return false;
        }
        else{
            //console.log(JsonFormat);
            pool.close();
            return JsonFormat;
        }
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}
//抓出已可查看之證書
async function select_tx_select(Email){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .input('SelectEmail',sql.Char,`${Email}`)
                        .query('select OwnerEmail from  Tx_Select where SelectEmail=@SelectEmail');
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        if(JsonFormat.recordset[0]==undefined){
            pool.close();
            return false;
        }
        else{
            pool.close();
            return JsonFormat;
        }
    }catch(err){
        console.log(err);
        //throw new Error(err);
    }
}
async function select_tx_select_Email(owner){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .input('SelectEmail',sql.Char,`${owner}`)
                        .query('select OwnerEmail from  Tx_Select where SelectEmail=@SelectEmail');
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        if(JsonFormat.recordset[0]==undefined){
            pool.close();
            return false;
        }
        else{
            pool.close();
            return JsonFormat;
        }
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}
async function selectAccountToShares(Email){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .input('Email',sql.Char,`${Email}`)
                        .query('select * from Account where Email=@Email');
        
        //console.log(JSON.parse(JSON.stringify(resultado)))
        const JsonFormat = JSON.parse(JSON.stringify(resultado))
        pool.close();
        if(JsonFormat.recordset[0]==undefined){
            return false;
        }
        else{
            return true;
        }
    }catch(err){
        console.log(err)
    }
}



//--------------------------------------------------------------Issuing--------------------------------------------------------------
//登入時發證端有無權限?
async function SelectIsuingpermission(Email,pd){
    try{
        let pool = await sql.connect(config)
        const resultado = await pool.request()
                        .input('Email',sql.Char,`${Email}`)
                        .input('figure',sql.Char,`Issuing`)
                        .input('hash',sql.Char,`${pd}`)//figure 身分
                        .query('select * from Account where Email=@Email AND figure=@figure AND hash=@hash');
        var JsonFormat=JSON.parse(JSON.stringify(resultado))
        if(JsonFormat.recordset[0]!=undefined){
            pool.close();
            return JsonFormat;
        }
        else{
            pool.close();
            return false;
        }
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}
// 寫入區塊鏈之證書地址
async function CreateBlockchainHash(Email  ,Time ){
    try{
        let pool = await sql.connect(config)
        const resultado = await pool.request()
                        .input('Email',sql.VarChar,`${Email}`)
                        .input('Times',sql.VarChar,`${Time}`)
                        .query('INSERT INTO dbo.Tx_Squence VALUES (@Email,@Times)');
            console.log(resultado)
            pool.close();
            return true;
        }catch(err){
            console.log('InsertDB ERRORRRRRRR '+err);
            //throw new Error("Create-ApplicationStatus-Error-SQLServer",false);
    }
}
async function select_key(email ,key){
    try{
        let pool = await sql.connect(config)
        const resultado = await pool.request()
                        .input('email',sql.Char,`${email}`)
                        .query('select * from public_key where email=@email');
        var JsonFormat=JSON.parse(JSON.stringify(resultado))
        if(JsonFormat.recordset[0] != undefined){
            pool.close();
            return JsonFormat;
        }
        else{
            pool.close();
            let st=await insertkey(email,key);
            if(st == true){
                return true;
            }
            return false;
        }
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}
async function insertkey(email , key){
    try{
        let pool = await sql.connect(config)
        await pool.request()
                    .input('email',sql.VarChar,`${email}`)
                    .input('pubkey',sql.VarChar,`${key}`)
                    .query('INSERT INTO dbo.public_key VALUES (@email,pubkey)');
            pool.close();
            return true;
        }catch(err){
            throw new Error("insert key-Error-SQLServer");
    }
}
async function shared_cert(email){
    try{
        let pool = await sql.connect(config);
        const resultado = await pool.request()
                        .input('OwnerEmail',sql.Char,`${email}`)
                        .query('select SelectEmail from  Tx_Select where OwnerEmail=@OwnerEmail');
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
        console.log(err);
        throw new Error(err);
    }
}
async function selectOwnerSharedCert(email){
    try{
        let pool = await sql.connect(config)
        const resultado = await pool.request()
                        .input('Email',sql.Char,`${email}`)
                        .query('select * from Tx_Squence where Email=@Email');
        var JsonFormat=JSON.parse(JSON.stringify(resultado))
        if(JsonFormat.recordset[0] != undefined){
            pool.close();
            return true;
        }
        else{
            pool.close();
            return false;
        }
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
}


module.exports =  { selectAccount , SelectIsuingpermission  ,SelectAccountForApply, shared_cert,
              CreateBlockchainHash,select_all_owner,insertAgreeselect ,select_tx_select ,select_key ,select_tx_select_Email ,selectAccountToShares,selectOwnerSharedCert};

 