import { connect } from "@/dbConfig/dbConfig";
import CartModel from "@/models/cartModel";
import UserModel from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    const action = request.nextUrl.searchParams.get("action");
    const { cartId } = params;
    const cartExists = await CartModel.findById(cartId);
    if (cartExists) {
      switch (action) {
        case "CART_INCREASE": {
          try {
            await CartModel.findByIdAndUpdate(cartId, {
              $set: { quantity: cartExists.quantity + 1 },
            });
            return NextResponse.json({
              messaage: "Cart quantity Increased Successfully",
              success: true,
            });
          } catch (error) {
            console.log("error:", error);
          }
        }
        case "CART_DECREASE": {
          try {
            if (cartExists.quantity > 1) {
              await CartModel.findByIdAndUpdate(cartId, {
                $set: { quantity: cartExists.quantity - 1 },
              });
            }
            return NextResponse.json({
              messaage: "Quantity decreased Successfully",
              success: true,
            });
          } catch (error) {
            console.log("error:", error);
          }
        }
        case "CART_DELETE": {
          try {
            await CartModel.findByIdAndDelete(cartId);

            return NextResponse.json({
              messaage: "Cart Item Deleted Successfully",
              success: true,
            });
          } catch (error) {
            console.log("error:", error);
          }
        }
        default:
          return NextResponse.json({
            messaage: "Cart Item Updated Successfully",
            success: true,
          });
      }
    }

    return NextResponse.json({
      messaage: "Cart Item Deleted Successfully",
      success: true,
    });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
