import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBodyAwait = await request.json();
    const { name, password, email, isManager, userType } = reqBodyAwait;
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User Already exists please login" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      userType,
      isManager,
      password: hashedPassword,
    });
    if (!newUser) {
      return NextResponse.json(
        {
          message: "User not created successfully",
          success: false,
        },
        { status: 400 }
      );
    }
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
