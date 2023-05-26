import { dbConnection } from "@/config/database";
import { Company } from "@/models/company";
import * as bcrypt from "bcrypt";

interface SignUpBody {
  companyName: string;
  userName: string;
  password: string;
}

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body: SignUpBody = await req.json();
    console.log(req.body);
    const findCompany = await Company.findOne({
      email: body.userName,
    });
    if (findCompany) {
      // throw user exists
      return new Response(JSON.stringify({ message: "Email arleady exists" }));
    }
    // hash password
    const hashPassword = bcrypt.hashSync(body.password, 10);

    const newCompany = await Company.create({
      name: body.companyName,
      email: body.userName,
      password: hashPassword,
    });
    return new Response(JSON.stringify(newCompany));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
};
