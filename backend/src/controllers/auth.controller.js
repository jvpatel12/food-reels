const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model") // correct import
const foodPartnerModel = require("../model/foodpartner.model");


async function registerUser(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log('registerUser request body:', { name, email });

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Name, email and password are required' });
    }

    // 1️⃣ Check email exists
    const isEmailExist = await userModel.findOne({ email });

    if (isEmailExist) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4️⃣ Create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // 5️⃣ Store token in cookie
    res.cookie("token", token);

    return res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error('registerUser error:', error);
    res.status(500).send({ message: error.message || "Server error" });
  }
}

async function loginUser(req, res) {
        try{
         const {  email, password } = req.body;

         const  user = await userModel.findOne({email});

         if(!user){
            return res.status(400).send({
                message:"Invalid email or password"
            })
         }

         const isPasswordValid = await bcrypt.compare(password,user.password);

         if(!isPasswordValid){
            return res.status(400).send({
                message:"Invalid email or password"
            })
         }
        

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.cookie("token",token);

        return res.status(200).json({
            message:"User Logged in Suceessfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            }
        })
        }
        catch(error){
         console.log(error);
         res.status(500).send({message:"Server error"});
        }
}

function  LogoutUser(req,res){
    res.clearCookie("token");

    return res.status(200).send({
        message:"User Logged out Successfully"
    })
}

async function foodPaterRegister(req,res){

    const {name,email,password} = req.body;

    const isEmailExist = await foodPartnerModel.findOne({email});

    if(isEmailExist){
        return res.status(400).send({
            message:"email already exists"
        })

    }

    const  hashedPassword  = await bcrypt.hash(password,10);

    const newFoodPartner = await foodPartnerModel.create({
        name,
        email,
        password:hashedPassword
    })
   
    const token  = jwt.sign({
        id:newFoodPartner._id,
    },process.env.JWT_SECRET);

    res.cookie("token",token);

    return res.status(201).json({
        message:"Food Partner Regitsered Successfully",
        foodParnter:{
            id:newFoodPartner._id,
            name:newFoodPartner.name,
            email:newFoodPartner.email
        }
    })
}
async function foodPaterLogin(req, res) {
  try {
    let { email, password } = req.body;

    email = email.toLowerCase(); // ⭐ FIX

    const user = await foodPartnerModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "Food Partner login successfully",
      foodPartner: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


function  LogoutPartner(req,res){
    res.clearCookie("token");

    return res.status(200).send({
        message:"User Logged out Successfully"
    })
}

async function getPartnerProfile(req, res) {
    try {
        const partner = req.foodPartner;
        
        return res.status(200).json({
            message: "Partner profile fetched successfully",
            partner: {
                id: partner._id,
                name: partner.name,
                email: partner.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { registerUser, loginUser ,LogoutUser ,foodPaterRegister,foodPaterLogin,LogoutPartner, getPartnerProfile};
