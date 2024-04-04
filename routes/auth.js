const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs')
const {regiterValidation} = require('./validation')


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

module.exports = router;