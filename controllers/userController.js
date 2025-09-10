const User = require("../models/User")
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

exports.registerUser = async(req,res) => {
    try {
        const {
            plan,
            businessName,
            email,
            password,
            phone,
            address,
            businessCategory,
            businessCategoryName,
            description,

        }  = req.body;




      if (
  !plan ||
  !businessName ||
  !email ||
  !password ||
  !phone ||
  !address ||
  !businessCategory ||
  !businessCategoryName ||
  !description ||
  !req.files?.logo?.length ||
  !req.files?.gallery?.length ||
  !req.files?.cover?.length
) {
  console.log({
    plan,
    businessName,
    email,
    password,
    phone,
    address,
    businessCategory,
    businessCategoryName,
    description,
    logo: req.files?.logo,
    gallery: req.files?.gallery,
    cover: req.files?.cover
  });

  return res.status(400).json({
    success: false,
    message: "All fields (including images) are required.",
  });
}

          // Check if user already exists by email
const existingUser = await User.findOne({ email });
if (existingUser) {
  return res.status(409).json({
    success: false,
    message: "Email is already registered.",
  });
}



        // const hashedPassword = await bcrypt.hash(password, 10);
        // 2. Upload logo
    const logoPath = req.files?.logo?.[0]?.path;
    const logoUpload = await cloudinary.uploader.upload(logoPath, {
      folder: "business/logo",
    });
    fs.unlinkSync(logoPath); // delete local file


    const coverPath = req.files?.cover?.[0]?.path;
    const coverUpload = await cloudinary.uploader.upload(coverPath, {
      folder: "business/cover",
    });
    fs.unlinkSync(coverPath); 



    // 3. Upload gallery images
    const gallery = [];
    for (let file of req.files.gallery || []) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "business/gallery",
      });
      gallery.push(result.secure_url);
      fs.unlinkSync(file.path); // delete local file
    }


    const logoUrl = logoUpload.secure_url;
    const coverUrl = coverUpload.secure_url;
const galleryImages = gallery;


        const user = new User({
            plan,
            businessName,
            email,
            password,
            phone,
            address,
            businessCategory,
            businessCategoryName,
            description,
            logoUrl,
            galleryImages,
            logoUrl,
            galleryImages,
            coverUrl
          });

          await user.save();
          res.status(201).json({ success: true, message: "User registered successfully." });


    } catch (error) {
        console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
    }
}