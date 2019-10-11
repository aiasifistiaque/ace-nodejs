const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('auth-token');
    if (!token){
        return res.status(401).send('ACCESS DENIED');
    }
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        //req.status(200).send('Successful');
        req.user = verified;
        next();
    }catch{
        res.status(400).send('INVALID TOKEN: '+token);
    }
}
