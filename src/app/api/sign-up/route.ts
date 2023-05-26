import { dbConnection } from "@/config/database";
import { Company } from "@/models/company";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface SignUpBody {
  companyName: string;
  userName: string;
  password: string;
}

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body: SignUpBody = await req.json();
    const findCompany = await Company.findOne({
      email: body.userName,
    });
    if (findCompany) {
      // throw user exists
      return NextResponse.json(
        { message: "Email arleady exists" },
        { status: 400 }
      );
    }
    // hash password
    const hashPassword = bcrypt.hashSync(body.password, 10);

    const newCompany = await Company.create({
      name: body.companyName,
      email: body.userName,
      password: hashPassword,
    });
    return NextResponse.json(newCompany, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
