import jwt from 'jsonwebtoken'

export function verifyToken (token: string) {
  return jwt.verify(token, process.env.JWT_SECRET as string)
}

export function signToken (
  data: object,
  expiresIn: jwt.SignOptions['expiresIn']
): string {
  return jwt.sign(data, process.env.JWT_SECRET as string, { expiresIn })
}
