import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/loginService';
import { Login } from '../interfaces/Login';

export default class LoginController {
  constructor(
    private service = new LoginService(),
  ) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body as Login;
      if (!user.password || !user.email) {
        return { status: 400, message: 'All fields must be filled' };
      }
      const loginData = await this.service.login(user.email, user.password);
      if (!loginData) {
        res.status(401).json({ message: 'Incorrect email or password' });
      } else {
        return res.status(200).json(loginData);
      }
    } catch (error) {
      next(error);
    }
  };
}
