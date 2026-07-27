import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findUser = await pool.query("select * from users where email = $1", [
      email,
    ]); // find user

    if (findUser.rows.length > 0) {
      return res.status(400).json({ message: "user is already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // make password more secure

    // record new user
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword],
    );

    const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    res
      .status(201)
      .json({ message: "User Created Successfully :)", user: newUser.rows[0] });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Error in Server" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResult = await pool.query(
      "select * from users where email = $1",
      [email],
    ); // find user
    if (userResult.rows.length <= 0) {
      return res.status(401).json({ message: "Email or Password is Wrong" });
    }
    const user = userResult.rows[0];

    const isMatch = await bcrypt.compare(password, user.password); // check if password is correct
    if (!isMatch){
      return res.status(401).json({ message: "Email or Password is Wrong" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User LogIn Successfully :)",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Error in Server" });
  }
};
