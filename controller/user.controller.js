
const User = require('../model/user')
const {userValidationSchema} = require('../validator/user.validator')
const bcrypt = require('bcrypt')
const config = require('config')
const serviceUser = require('../service/user.service')

const getLoginForm = (req,res)=>{
    res.render('login/layout')
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const findUser = await serviceUser.findEmail({email})
    if(!findUser){
        return res.render('signup/layout',{message:'User does not Exist Signup'})
    }
    const matchPassword = await bcrypt.compare(password, findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credential Mismatched'})
    }
    return res.render('user/layout')
    
}
const getSignupForm = (req,res)=>{
    res.render('signup/layout')
}

const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const hashedPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const {error,value} = userValidationSchema(fields)
    if(error){
        return res.render('signup/layout',{message:error.details[0].message})
    }
    const findUser = await serviceUser.findEmail({email})
    if(findUser){
        return res.render('signup/layout',{message:'User already exists'})
    }
    const createUser = await serviceUser.createField({email,password:hashedPassword})
    return res.render('signup/layout',{message:'User Created'})
    
}

module.exports = {getLoginForm,login,getSignupForm,signup}