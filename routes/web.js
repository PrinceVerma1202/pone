const express = require('express');
const FrontController = require('../controllers/FrontController');
const route = express.Router();

const checkUserAuth = require("../middleware/auth");
const CourseControl = require('../controllers/CourseController');
const AdminController = require('../controllers/AdminController');


route.get('/',FrontController.login)
route.get('/home',checkUserAuth,FrontController.home)
route.get('/contact',checkUserAuth,FrontController.contact)
route.get('/about',checkUserAuth,FrontController.About)
route.get('/register',FrontController.register)
route.post('/insertreg',FrontController.insertReg)
route.post('/vlogin',FrontController.vlogin)
route.get('/logout',FrontController.logout)
route.get('/profile',checkUserAuth,FrontController.profile)
route.post('/updateProfile', checkUserAuth, FrontController.updateProfile)
route.post('/changepassword/', checkUserAuth,FrontController.changePassword)

route.post('/course_insert',checkUserAuth,CourseControl.courseInsert)
route.get('/course_display', checkUserAuth, CourseControl.courseDisplay)
route.get('/course_view/:id', checkUserAuth, CourseControl.courseview)
route.get('/course_edit/:id', checkUserAuth, CourseControl.courseEdit)
route.get('/course_delete/:id', checkUserAuth, CourseControl.courseDelete)
route.post('/course_update/:id', checkUserAuth, CourseControl.courseUpdate)

// admin controller 
route.get('/admin/dashboard',checkUserAuth,AdminController.dashboard)
route.post('/admin/update_status/:id',checkUserAuth,AdminController.update_status)


module.exports=route;
