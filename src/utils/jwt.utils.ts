
import jwt from "jsonwebtoken";

export function generateToken(id: Number) {
  const token = jwt.sign(id, `12345678`);
  return token;
}

export function verifyToken(token: string) {
  const verification = jwt.verify(token, `12345678`);
  return verification;
}
