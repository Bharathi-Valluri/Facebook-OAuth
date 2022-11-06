const passport =require('passport')
const express =require('express')
const {config}=require('../configuration/config')
var router =express.Router()
const ejs=require('express')

router.get('/',function(req,res){
    res.render('/home/bharathi/Facebook-OAuth/source/views/pages/index.ejs')
})

router.get('/profile',isLoggedIn,function(req,res){
    res.render('/home/bharathi/Facebook-OAuth/source/views/pages/profile.ejs',{
        user:req.user
    })
})
router.get('/login',isLoggedIn,function(req,res){
    res.render('/home/bharathi/Facebook-OAuth/source/views/pages/login.ejs',{
        user:req.user
    })
})
router.get('/error',isLoggedIn,function(req,res){
    res.render('/home/bharathi/Facebook-OAuth/source/views/pages/error.ejs',{
        user:req.user
    })
})

router.get('/auth/facebook',
    passport.authenticate('facebook',{scope:['profile','email']}));
    
router.get('/auth/facebook/callback',function () {
        passport.authenticate('facebook',
        {success:'/profile',failureRedirect:'/error'})
})

router.get('/logout',function(req,res){
    req.logout()
    res.redirect('/')
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())

    return next()

    res.redirect('/')

    }
module.exports=router