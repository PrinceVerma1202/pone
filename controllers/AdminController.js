const CourseModel = require('../models/course')
const nodemailer = require('nodemailer')
class AdminController{

    static dashboard = async (req,res)=>{
        try {
            const {name,image,email}=req.userdata;
            const course = await CourseModel.find();
            // console.log(course)
            res.render("admin/dashboard",{c:course,n:name,i:image})
        } catch (error) {
            console.log(error)
        }
    }
    static update_status = async (req,res)=>{
        try {
            const {name,status,comment,email}=req.body;
        //   console.log(req.body)
        await CourseModel.findByIdAndUpdate(req.params.id,{
            comment:comment,
            status: status,
        });
        this.sendEmail(name,email,status,comment)
        res.redirect("/admin/dashboard")
        } catch (error) {
            console.log(error)
        }
    }
    static sendEmail = async (name,email,status,comment) => {
        // console.log(name,email,status,comment)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "pv43209@gmail.com",
                pass: "hubsfvhycfrbqcuv",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: ` Course ${status}`, // Subject line
            text: "heelo", // plain text body
            html: `<b>${name}</b> Course  <b>${status}</b> successful! <br>
             <b>Comment from Admin</b> ${comment} `, // html body
        });
    };
}

module.exports = AdminController;