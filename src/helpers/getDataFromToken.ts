import { NextRequest } from "next/server";

import Jwt from "jsonwebtoken";
export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.headers.get("token") || "";
    let decodedToken = Jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
