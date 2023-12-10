import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
export const getDataFromToken = async(token: string) => {
  try {
    let decodedToken =await Jwt.verify(token, process.env.JWT_SECRET_KEY!);

    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
