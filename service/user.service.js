const User = require('../model/user')

const findEmail = (field)=>{
    return User.findOne(field)
}

const createField = (fields)=>{
    return User.create(fields)
}

module.exports = {findEmail,createField}