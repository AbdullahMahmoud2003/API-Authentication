const router = require('express').Router();
const User = require('../Models/User');
const {regiterValidation} = require('./validation')


router.post('/register', async (req, res) => {

    //validate the user
    const {error} = regiterValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("email already exists");

    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{
        const savedUser = await user.save();
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err);
    }

})

module.exports = router;