const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CourseModel = require("../models/course");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dhqlbkhri",
  api_key: "864963865265979",
  api_secret: "5CBjwQTBNUUcqUpPub3W-j5DHV4",
});
class FrontController {

  static contact = async (req,res)=>{
    try {
      const {name, image, email, id} = req.userdata
      res.render('contact',{n:name, i: image,
        e: email,})
    } catch (error) {
      console.log(error)
    }
  }
  static About = async (req,res)=>{
    try {
      const {name, image, email, id} = req.userdata
      res.render('About',{n:name, i: image,
        e: email,})
    } catch (error) {
      console.log(error)
    }
  }
  static login = async (req, res) => {
    try {
      res.render("login", {
        message: req.flash("message"),
        error: req.flash("error"),
      });
    } catch (error) {
      console.log(error);
    }
  };
  static home = async (req, res) => {
    try {
      const { name, image, email, id } = req.userdata;
      const btech = await CourseModel.findOne({ user_id: id, course: "btech" });
      const bca = await CourseModel.findOne({ user_id: id, course: "bca" });
      const mca = await CourseModel.findOne({ user_id: id, course: "mca" });
      // console.log(btech)
      res.render("home", {
        n: name,
        i: image,
        e: email,
        b: btech,
        bca: bca,
        mca: mca,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static vlogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { e, p } = req.body;
      if (e && p) {
        const user = await UserModel.findOne({ email: e });

        if (user != null) {
          const isMatched = await bcrypt.compare(p, user.password);
          if (isMatched) {
            if(user.role == "admin"){
            //token

              let token = jwt.sign({ ID: user.id }, "pninfosysbsdbjhsdbkjc55");
              //console.log(token);
              res.cookie("token", token);
  
              res.redirect("/admin/dashboard");
            }else{
              let token = jwt.sign({ ID: user.id }, "pninfosysbsdbjhsdbkjc55");
              //console.log(token);
              res.cookie("token", token);
  
              res.redirect("/home");
            }
           
          } else {
            req.flash("error", "Email or Password is not valid");
            res.redirect("/");
          }
        } else {
          req.flash("error", "You are not registered user");
          res.redirect("/");
        }
      } else {
        req.flash("error", "All fields Required");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static insertReg = async (req, res) => {
    try {
      // console.log(req.files.Image);
      const file = req.files.Image;
      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile",
      });
      // console.log(uploadImage);
      // console.log(req.body)
      const { n, e, p, cp } = req.body;
      const user = await UserModel.findOne({ email: e });
      // console.log(user)
      if (user) {
        req.flash("error", "Email is already exist");
        res.redirect("/register");
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashpassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              //model : view
              email: e,
              name: n,
              password: hashpassword,
              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            await result.save();
            req.flash("succes", "Register success plz Login");
            res.redirect("/");
          } else {
            req.flash("error", "Pasword and conferm Password does not match");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All fields are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.userdata;
      res.render("profile", { n: name, i: image, e: email });
    } catch (error) {
      console.log(error);
    }
  };
  static updateProfile = async (req, res) => {
    try {
      const { id } = req.userdata;
      const { name, email, image } = req.body;
      //  console.log(req.files.image)
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        //console.log(imageID)
        //deleting image from cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update

        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "profileImage",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update profile Successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };
  static changePassword = async (req, res) => {
    try {
      const { op, np, cp } = req.body;
      const { id } = req.userdata;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        console.log(isMatched);
        if (!isMatched) {

          req.flash("error", "current password is incorrect");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "password updated successfully");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "all fields are required");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
