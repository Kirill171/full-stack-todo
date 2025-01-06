import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    return user;
  }

  async loginByEmail(email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error('Email or password is missing');
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async loginByUsername(username: string, password: string): Promise<string> {
    if (!username || !password) {
      throw new Error('Username or password is missing');
    }

    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: { email: string; sub: number }): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
  }
}
