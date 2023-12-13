import { connect } from "@/dbConfig/dbConfig";
import OrderModel from "@/models/orderModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import CartModel from "@/models/cartModel";
connect();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { cartIds, cartTotal, orderId } = reqBody;
    const duplicateOrder = await OrderModel.findOne({
      cartIds: { $in: cartIds },
    });
    
    if (duplicateOrder) {
      return NextResponse.json("Duplicate Order exists", { status: 400 });
    }
    const result = await OrderModel.create({ cartIds, cartTotal, orderId });
    // await CartModel.deleteMany({ _id: { $in: cartIds } });
    return NextResponse.json(
      {
        message: "Order created Successfully",
        success: true,
        result,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export const GET = async (request: NextRequest) => {
  try {
    const data = await OrderModel.find({}).populate("cartIds");
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
