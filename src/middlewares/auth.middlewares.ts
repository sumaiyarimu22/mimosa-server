import { Request, Response, NextFunction } from 'express';
import { userType } from '../types/user.type';
import JWTTokenManager from '../manager/jwt-token.manager';
import UserModel from '../models/user.model';

interface JwtPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    user?: userType;
  }
}

const jwtInstance = new JWTTokenManager();
export default class AuthMiddleware {
  public async isAuthentcated(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ message: 'Unauthorize' });
      return;
    }

    try {
      const payload = jwtInstance.verifayToken(token) as JwtPayload;
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ message: 'Unauthorize' });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorize' });
      return;
    }
  }

  public async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {}
}
