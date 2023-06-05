import { dbConnection } from "@/config/database";
import { sendEmail } from "@/config/emailTransporter";
import { uploadFile } from "@/helpers/upload";
import { Requester } from "@/models/requester";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await dbConnection();
    const body = await req.json();
    const findRequester = await Requester.findOne({
      name: body.name,
    });
    if (findRequester)
      return NextResponse.json(
        { message: `Company ${body.name} has arleady sent a request` },
        { status: 400 }
      );
    // upload image

    const imageUpload = body.profilePhoto
      ? await uploadFile(body.file)
      : "test";
    // create requester
    const createRequester = await Requester.create({
      name: body.name,
      description: body.description,
      contactInfo: body.contactInfo,
      profilePhoto: imageUpload,
      website: body.website,
      email: body.email,
      message: body.message,
    });
    // send them email
    await sendEmail({
      receiverEmail: "s.ishimwegabin@gmail.com",
      title: "Request platform usage",
      body: `
      <h1>Request platform usage</h1>
      <p>${createRequester}</p>
      `,
    });
    return NextResponse.json(
      {
        message: "Request message sent",
        data: createRequester,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
