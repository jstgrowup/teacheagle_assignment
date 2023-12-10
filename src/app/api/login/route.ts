import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log('password:', password)
    console.log('email:', email)
    const foundUser = await User.findOne({ email })
    console.log('foundUser:', foundUser)

    if (!foundUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("here");
    
    const validPassword = await bcryptjs.compare(password, foundUser.password);
    console.log('validPassword:', validPassword)
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const tokenData = {
      userId: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      isManager: foundUser.isManager,
    };
    const token: any = jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json(
      {
        message: "Login Successfull",
        success: true,
        isManager: foundUser.isManager,
      },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log('error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
