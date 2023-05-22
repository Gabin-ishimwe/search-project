import { dbConnection } from "../../config/database";
import { Company } from "../../models/company";

export async function GET(request: Request) {
  try {
    await dbConnection();
    return new Response("hello");
  } catch (error) {}
  return new Response("Testing route");
}

export async function POST(request: Request) {
  try {
    await dbConnection();
    const newCompany = new Company({
      name: "MTN",
    });
    const savedCompany = await newCompany.save();
    return new Response(savedCompany);
  } catch (error: any) {
    console.log(error);
    return new Error(error.message);
  }
}
