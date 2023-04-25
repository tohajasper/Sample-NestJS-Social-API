import { JwtModuleOptions } from '@nestjs/jwt';
const JWT_SECRET = process.env.JWT_SECRET

export const jwtConfig: JwtModuleOptions = {
  secret: JWT_SECRET, signOptions: { expiresIn: '60s' },
}
