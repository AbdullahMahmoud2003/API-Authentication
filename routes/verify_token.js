const jwt = require('jsonwebtoken');

function(req, res, next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied')
}