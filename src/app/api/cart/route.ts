import { connect } from "@/dbConfig/dbConfig";
import CartModel from "@/models/cartModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();
export const POST = async (request: NextRequest) => {
  try {
    const { productId } = await request.json();
    const cookieStore = cookies();
    const token =
      cookieStore.get("token")?.value || request.headers.get("token") || "";
    const userFromToken: any = await getDataFromToken(token);
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
      productId: productId,
      userId: userId,
    });
    console.log("existingProduct:", existingProduct);
    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Prouct Already in cart",
          success: true,
        },
        { status: 200 }
      );
    }
    await CartModel.create({ productId, userId });
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
    const userFromToken: any = await getDataFromToken(
      cookieStore.get("token")?.value || request.headers.get("token") || ""
    );
    console.log("userFromToken:", userFromToken);
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
