import { dbConnection } from "@/config/database";
import { jwtAccessToken } from "@/helpers/jwtHelplers";
import { Company } from "@/models/company";
import * as bcrypt from "bcrypt";
import { NextResponse } from "next/server";

interface SignInBody {
  userName: string;
  password: string;
}

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body: SignInBody = await req.json();
    const findCompany = await Company.findOne({
      email: body.userName,
    });
    if (!findCompany) {
      return NextResponse.json(
        { message: "Account doesn't exist" },
        { status: 404 }
      );
    }
    if (!bcrypt.compareSync(body.password, findCompany.password)) {
      return NextResponse.json({ message: "Bad credentials" }, { status: 400 });
    }
    const accessToken = jwtAccessToken(findCompany.toJSON());
    return NextResponse.json(
      {
        id: findCompany._id,
        email: findCompany.email,
        accessToken,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
