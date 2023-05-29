import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const DEFAULT_EXPIRATION_TIME = {
  expiresIn: "1h",
};

export const jwtAccessToken = (
  payload: object,
  options: SignOptions = DEFAULT_EXPIRATION_TIME
) => {
  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secretKey!, options);
  return token;
};

export const decodeToken = (token: string) => {
  try {
    const secretKey = process.env.JWT_SECRET;
    const decodedToken = jwt.verify(token, secretKey!);
    return decodedToken as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
