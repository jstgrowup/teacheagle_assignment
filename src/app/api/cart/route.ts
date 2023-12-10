import { connect } from "@/dbConfig/dbConfig";
import CartModel from "@/models/cartModel";
import UserModel from "@/models/userModel";
import { cookies } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();
export const POST = async (request: NextRequest) => {
  try {
    const { productId, quantity } = await request.json();
    const cookieStore = cookies();
    const token =
      cookieStore.get("token")?.value || request.headers.get("token") || "";
    console.log("token:", token);
    const userFromToken: any = await getDataFromToken(token);
    console.log('userFromToken:', userFromToken)
    if (!userFromToken) {
      NextResponse.json(
        {
          error: "Invalid Token",
          success: true,
        },
        { status: 400 }
      );
    }
    const { userId, name, email, isManager }: any = userFromToken;
    const existingProduct = await CartModel.findOne({
      producId: productId,
      userId: userId,
    });
    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Prouct Already in cart",
          success: true,
        },
        { status: 400 }
      );
    }
    await CartModel.create({ productId, quantity, userId });
    // await CartModel.findByIdAndUpdate(cartItems.id, {
    //   $set: { quantity: cartItems.quantity + 1 },
    // });
    return NextResponse.json({
      message: "Prouct Added to cart successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export const GET = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();
    const userFromToken: any = getDataFromToken(
      cookieStore.get("token")?.value || request.headers.get("token") || ""
    );
    const cartItems = await CartModel.find({
      userId: userFromToken.userId,
    }).populate("productId");

    return NextResponse.json({
      success: true,
      cartItems,
    });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
