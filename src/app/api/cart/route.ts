import { connect } from "@/dbConfig/dbConfig";
import CartModel from "@/models/cartModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export const POST = async (request: NextRequest) => {
  try {
    const { productId, quantity } = await request.json();
    const token = request.headers.get("token");
    const userDetails = jwt.verify(token!, process.env.JWT_SECRET_KEY!);
    if (!userDetails) {
      NextResponse.json(
        {
          error: "Invalid Token",
          success: true,
        },
        { status: 400 }
      );
    }
    const { userId, name, email, isManager }: any = userDetails;
    const cartItems = await CartModel.findOne({ userId, productId });
    if (cartItems) {
      try {
        await CartModel.findByIdAndUpdate(cartItems.id, {
          $set: { quantity: cartItems.quantity + 1 },
        });
      } catch (error) {
        NextResponse.json(
          {
            error:
              "Sorry there is something wrong while adding product to cart",
            success: true,
          },
          { status: 400 }
        );
      }
    } else {
      try {
        await CartModel.create({ productId, quantity, userId });
      } catch (error) {
        NextResponse.json(
          {
            error:
              "Sorry there is something wrong while adding product to cart",
            success: true,
          },
          { status: 400 }
        );
      }
    }
    return NextResponse.json({
      message: "Prouct Added to cart successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
export const GET = async (request: NextRequest) => {
  try {
    // todo
    return NextResponse.json({
      message: "Prouct Added to cart successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
