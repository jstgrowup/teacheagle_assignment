import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import OrderModel from "@/models/orderModel";
import Inventory from "@/models/inventoryModel";
connect();
export const DELETE = async (request: NextRequest, { params }: any) => {
  try {
    const { id } = params;

    const response = await Inventory.findByIdAndDelete(id);
    if (!response) {
      return NextResponse.json(
        "Something is wrong while deleting the product",
        { status: 400 }
      );
    }
    return NextResponse.json("Product deleted Successfully successfully", {
      status: 200,
    });
  } catch (error: any) {

    return NextResponse.json(error.message, { status: 500 });
  }
};
