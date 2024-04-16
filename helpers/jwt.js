const jwt = require('jsonwebtoken');

const generarJWT= (uid,name)=> {

    return new Promise((resolve,reject)=>{

        const payaload ={uid,name}

        jwt.sign(payaload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h',
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            
            resolve(token)
        })




    })

}

const obtenerIframe = (dashboard)=>{
    var METABASE_SITE_URL = "https://metabase.analizardatos.com";
    var METABASE_SECRET_KEY = "9c79a212553a4d1dc13a1e78062b750081e2206e5db5cb21bdba3e2c8a797202";
    if (typeof(dashboard)=='string'){
        dashboard=parseInt(dashboard)
    }
    var payload = {
    resource: { dashboard: dashboard },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minute expiration
    };
    var token = jwt.sign(payload, METABASE_SECRET_KEY);

    var iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=false&titled=true";
    return  iframeUrl;
}

module.exports={
    generarJWT,
    obtenerIframe
} 