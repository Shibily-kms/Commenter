const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({ message: "Get Connected" })
})
router.post('/',(req,res,next)=>{
    console.log(req.body,'this body data');
    res.status(200).json({ message: "Post Connected" })
})
router.put('/',(req,res,next)=>{
    console.log(req.body,'this body data');
    res.status(200).json({ message: "Put Connected" })
})
router.delete('/',(req,res,next)=>{
    console.log(req.body,'this body data');
    res.status(200).json({ message: "delete Connected" })
})

module.exports = router;