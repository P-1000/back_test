import jwt from "jsonwebtoken";
import User from "../models/User.js";
import axios from "axios";

const compare_pass = (a, b) => {
  if (a === b) {
    return true;
  } else {
    return false;
  }
}


export const login = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;

    // Step 1: Check if the /profile request is successful
    const profileResponse = await axios.post("https://flaskappdeploy.azurewebsites.net/profile", {
      registration: registrationNumber,
      password: password,
    });

    if (profileResponse.status !== 200) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const dat = await profileResponse.data

    // Extract relevant data from profileResponse
    const { data: profileData } = profileResponse;

    if(!profileData.data){
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if(!profileData.data){
      return res.status(401).json({ message: "Invalid credentials" });
    }



    // Step 2: Check if the user with the registration number exists
    let user = await User.findOne({ registrationNumber });

    if (user) {
      // User exists, compare passwords
      const isPasswordCorrect = await compare_pass(password, user.password);
      
      if (!isPasswordCorrect) {
        // if password is incorrect then update the password with user.password without hashing
        user.password = await password;
        await user.save();
      }
      // Password is correct, no need to update
    } else {
      // Step 3: Create a new user if not found
      const hashedPassword = await password;
      user = new User({
        registrationNumber,
        password: hashedPassword,
        Name: profileData.data.Name['Full Name'],
        section : profileData.data.section,
        Programme : profileData.data.Programme
      });
      await user.save();

    }

    // Step 4: Generate and return a token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ token, dat }); // Send profileData instead of the entire profileResponse
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

export const verify = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    res.json({ message: "Token verified" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying token" });
  }
};
