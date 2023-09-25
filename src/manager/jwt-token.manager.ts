import dotenv from 'dotenv';

import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

//handle token class
export default class JWTTokenManager {
  private readonly secret: string;
  private readonly expireIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.expireIn = `7d`;
  }
  public createToken(id: string): string {
    try {
      const token = jwt.sign({ id }, this.secret, { expiresIn: this.expireIn });
      return token;
    } catch (error) {
      throw new Error('Token creation failed');
    }
  }

  public verifayToken(token: string): JwtPayload | string | object {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (error) {
      throw new Error('Token verification failed');
    }
  }
}
