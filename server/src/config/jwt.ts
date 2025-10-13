export const JWT_CONFIG: { secret: string; expiresIn: string } = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key_change_in_production',
  expiresIn: '2h' // Token validity duration
};