import { connect } from "@/dbConfig/dbConfig";
import CartModel from "@/models/cartModel";
import UserModel from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    const { cartId } = params;
    
    const cartItems = await CartModel.findByIdAndDelete(cartId);

    return NextResponse.json({
      messaage: "Cart Item Deleted Successfully",
      success: true,
      cartItems,
    });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
