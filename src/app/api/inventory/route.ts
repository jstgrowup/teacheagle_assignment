import { connect } from "@/dbConfig/dbConfig";
import InventoryModel from "@/models/inventoryModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export const POST = async (request: NextRequest) => {
  try {
    const reqBodyAwait = await request.json();
    const {
      productName,
      productImage,
      productDescription,
      weight,
      quantity,
      price,
      stockQuantity,
    } = reqBodyAwait;

    let existingProduct = await InventoryModel.findOne({
      productName: productName,
      weight: weight,
    });
    if (existingProduct) {
      return NextResponse.json(
        { error: "Product Already exists" },
        { status: 400 }
      );
    }

    const data = await InventoryModel.create({
      productName,
      productImage,
      productDescription,
      weight,
      quantity,
      price,
      stockQuantity,
    });
    return NextResponse.json({
      message: "Product created successfully",
      success: true,
      data,
    });
  } catch (error: any) {
    
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
};
export const GET = async () => {
  try {
    let data = await InventoryModel.find({ inStock: true });
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
};
