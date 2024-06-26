const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {regiterValidation, loginValidation} = require('./validation');


router.post('/register', async (req, res) => {

    //validate the user
    const {error} = regiterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("email already exists");

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log(hashedPassword);

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({
            user: user.id,
            username: user.name
        });
    }catch(err){
        res.status(400).send(err);
    }

})

router.post('/login', async (req, res) => {
    //validate the user
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("email or password is wrong");  

    //password is correct
    const validPass = await bcrypt.compare( req.body.password, user.password);
    if(!validPass) return res.status(400).send("invalid password");

    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
})

module.exports = router;