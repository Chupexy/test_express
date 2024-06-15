const express = require('express')
const router = express.Router()
const Members = require('../Members')
const uuid = require('uuid')

//endpoints 

router.get('/all_members', (req, res) =>{
    const msg = 'successful'
    const count = Members.length

    if(count === 0)
        return res.status(200).send({status: 'ok', msg: 'No members found'})

    return res.status(200).send({status: 'ok', msg, Members, count})
})

//endpoint to create user
router.post('/create_user', (req, res)=>{
    const {fullname, email, phone} = req.body
    if(!fullname || !email || !phone){
        return res.status(400).send({status: 'error', msg: 'All fields must be filled'})
    }

    const newMember = Members.push({
        id : uuid.v1(),
        fullname,
        email,
        phone,
        is_online: true
    })

    return res.status(200).send({status: 'ok', msg: 'Successfully Created', Members, count:newMember})

})

//endpoint to edit user
router.put('/edit_user', (req, res)=>{
    const {fullname, email, phone,id} = req.body

    if(!id)
        return res.status(400).send({status: 'error', msg: 'All fields must be filled'})

    //checks if the user exists
    let index = -1
    const found = Members.some((member)=>{
        index++
       return member.id === id})

       if(!found)
        return res.status(200).send({status: 'ok', msg: 'No members found'})

    const [user] = Members.filter((member)=>{
        return member.id === id
    })

    user.fullname = fullname ? fullname : user.fullname
    user.email = email ? email : user.email
    user.phone = phone ? phone : user.phone

    Members[index] = user

    return res.status(200).send({status: 'ok', msg: 'Successfully Edited', Members})
})

    


module.exports = router