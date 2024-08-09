import { Injectable } from '@nestjs/common';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

export interface TokenPayload {
  id: number;
  name: string;
  email: string;
}

export interface AuthServiceInterface {
  generateToken: (payload: TokenPayload) => string;
  hashPassword: (password: string) => string;
  comparePassword: (password: string, hash: string) => Promise<boolean>;
}

@Injectable()
export class AuthService {
  public generateToken(payload: TokenPayload): string {
    return jsonwebtoken.sign({ payload: payload }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  public hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async verifyToken(token: string): Promise<TokenPayload> {
    return jsonwebtoken.verify(token, process.env.JWT_SECRET);
  }
}
