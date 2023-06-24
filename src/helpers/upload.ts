import cloudinary from "@/config/cloudinary";

export const uploadFile = async (image: any) => {
  const fileUpload = await cloudinary.uploader.upload(image);
  return fileUpload.secure_url;
};
