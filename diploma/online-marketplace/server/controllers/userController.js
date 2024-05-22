const { query } = require("express");
const ApiError = require('../error/ApiError');
const bcypt = require('bcrypt');
const {User, Basket} = require('../models/models');
const jwt = require('jsonwebtoken');

function generateJwt(id, email, role) {
    return jwt.sign(
      { id, email, role },
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
  }

class UserController {

    async registration(req, res, next) {
        const {email, password, role} = req.body;
        if(!email || !password) {
            return next(ApiError.badRequest('Uncorrect email or password.'));
        }

        const candidate = await User.findOne({where: {email}});

        if(candidate){
            return next(ApiError.badRequest('User already registered.'));
        }

        const hashPassword = await bcypt.hash(password, 5);
        const user = await User.create({email, role, password: hashPassword});

        const basket = await Basket.create({userId: user.id});
        const token = jwt.sign({id: user.id, email, role},
             process.env.SECRET_KEY,
             {expiresIn: '24h'}
            );
            return res.json({token});
    }   

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
          return next(ApiError.internal('User not found.'));
        }
    
        let comparePassword = bcypt.compareSync(password, user.password);
    
        if (!comparePassword) {
          return next(ApiError.internal('Password is incorrect'));
        }
    
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({ token });
      }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();