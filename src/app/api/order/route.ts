import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { cartId, cartTotal } = reqBody;
    const result = await OrderModel.create({ cartId, cartTotal });
    return NextResponse.json(
      {
        message: "Login Successful",
        success: true,
        result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
