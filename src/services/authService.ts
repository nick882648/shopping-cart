import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { AdminModel } from '../models/Admin';

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10');
const JWT_SECRET = process.env.JWT_SECRET || 'user_secret';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin_secret';
const ADMIN_JWT_EXPIRE = process.env.ADMIN_JWT_EXPIRE || '24h';

export class AuthService {
  // Hash password
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  // Compare password
  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  // Generate user JWT token
  static generateUserToken(userId: number): string {
    return jwt.sign({ userId, type: 'user' }, JWT_SECRET, { expiresIn: JWT_EXPIRE });
  }

  // Generate admin JWT token
  static generateAdminToken(adminId: number): string {
    return jwt.sign({ adminId, type: 'admin' }, ADMIN_JWT_SECRET, { expiresIn: ADMIN_JWT_EXPIRE });
  }

  // Verify user token
  static verifyUserToken(token: string): any {
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // Verify admin token
  static verifyAdminToken(token: string): any {
    try {
      return jwt.verify(token, ADMIN_JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  // User signup
  static async userSignup(username: string, email: string, password: string, firstName?: string, lastName?: string): Promise<any> {
    // Check if user already exists
    const existingUser = await UserModel.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const existingUsername = await UserModel.getUserByUsername(username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create user
    const userId = await UserModel.createUser({
      username,
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName
    });

    // Generate token
    const token = this.generateUserToken(userId);

    return {
      userId,
      username,
      email,
      token
    };
  }

  // User signin
  static async userSignin(email: string, password: string): Promise<any> {
    // Find user
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify password
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate token
    const token = this.generateUserToken(user.id!);

    return {
      userId: user.id,
      username: user.username,
      email: user.email,
      token
    };
  }

  // Admin signup
  static async adminSignup(username: string, email: string, password: string, role: string = 'admin'): Promise<any> {
    // Check if admin already exists
    const existingAdmin = await AdminModel.getAdminByEmail(email);
    if (existingAdmin) {
      throw new Error('Email already registered as admin');
    }

    const existingUsername = await AdminModel.getAdminByUsername(username);
    if (existingUsername) {
      throw new Error('Username already taken');
    }

    // Hash password
    const hashedPassword = await this.hashPassword(password);

    // Create admin
    const adminId = await AdminModel.createAdmin({
      username,
      email,
      password: hashedPassword,
      role
    });

    // Generate token
    const token = this.generateAdminToken(adminId);

    return {
      adminId,
      username,
      email,
      role,
      token
    };
  }

  // Admin signin
  static async adminSignin(email: string, password: string): Promise<any> {
    // Find admin
    const admin = await AdminModel.getAdminByEmail(email);
    if (!admin) {
      throw new Error('Admin not found');
    }

    // Verify password
    const isPasswordValid = await this.comparePassword(password, admin.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // Generate token
    const token = this.generateAdminToken(admin.id!);

    return {
      adminId: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token
    };
  }
}