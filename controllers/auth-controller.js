const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {jwtOptions} = require('../auth/jwt-options');

const register = (req, res) => {
    const {email, password} = req.body;

    const user = User.build({email, password});
    user.validate()
    .then(() => {
        return bcrypt.hash(user.password, 10);
    })
    .then(hash => {
        user.password = hash;
        return user.save();
    })
    .then(() => {
        res.status(201).json();
    })
    .catch(err => {
        res.status(400).json(err);
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        res.status(400).json({error: 'Provide credentionals'});
    }

    let user = null;
    try {
        user = await User.findOne({where: {email}});
    }
    catch(e) {
        res.status(500).json({error: 'Internal Server Error'});
    }

    if(!user){
        res.status(404).json();
    }

    bcrypt.compare(password, user.password)
    .then(compareRes => {
        if(compareRes) {
            let payload = { id: user.id };
            let token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({token});
        }
        else {
            res.status(400).json({error: 'Wrong credentioals'});
        }
    });
}


exports.authController = {register, login};