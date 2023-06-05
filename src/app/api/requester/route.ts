import { uploadFile } from "@/helpers/upload";
import { createReadStream } from "fs";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextApiRequest) => {
  try {
    // await dbConnection();
    // create requester
    const body = await req.body;
    console.log(body, "here---------");
    // console.log(body.file.path);
    const stream = createReadStream(body.path);
    // const findRequester = await Requester.findOne({
    //   name: body.get("name"),
    // });
    // if (findRequester)
    //   return NextResponse.json(
    //     { message: `Company ${body.get("name")} has arleady sent a request` },
    //     { status: 400 }
    //   );
    // upload image
    // const image = typeof body.get("image")
    const imageUpload = await uploadFile(stream);
    console.log(imageUpload);
    return NextResponse.json(body, { status: 201 });
    // const createRequester = await Requester.create({
    // })
    // send them email
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
