import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/httpException";
import { prisma } from "../database/database";

const tokenPassword = process.env.TOKEN_PASSWORD || 'pass';

export class AuthService {
  static async register(user: User) {
    // Verificar si el usuario ya existe
    const findUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (findUser) throw new HttpException(409, `User ${user.email} already exists`);

    // Encriptar el password
    const passwordEncrypted = await bcrypt.hash(user.password, 10);
    user.password = '';

    // Guardar el usuario en la base de datos
    return await prisma.user.create({
      data: {
        ...user,
        password: passwordEncrypted,
        role: null,
      },
      omit: {
        password: true,
      },
    });
  }

  static async login(email: string, password: string) {
    // Verificar si el usuario existe
    const findUser = await prisma.user.findUnique({ where: { email } });
    if (!findUser) throw new HttpException(401, 'Invalid user or password');

    // Verificar si el password coincide
    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);
    if (!isPasswordCorrect) throw new HttpException(401, 'Invalid user or password');

    // Generar el token de autenticación
    const token = jwt.sign(
      { colorFavorito: 'azul', id: findUser.id, email: findUser.email, role: findUser.role, name: findUser.name},	// Payload
      tokenPassword,
      { expiresIn: "1h" }
    );

    // Devolver el token y el usuario
    return { token, user: {  name: findUser.name ,id: findUser.id, email: findUser.email, role: findUser.role } };

  }
}