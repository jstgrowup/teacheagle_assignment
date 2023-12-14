import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import OrderModel from "@/models/orderModel";
connect();
export const PUT = async (request: NextRequest, { params }: any) => {
  try {
    const { orderStatus } = await request.json();

    const { orderId } = params;

    await OrderModel.findByIdAndUpdate(orderId, {
      orderStatus: orderStatus,
    });
    return NextResponse.json("Status updated successfully", { status: 200 });
  } catch (error: any) {
    return NextResponse.json(error.message, { status: 500 });
  }
};
