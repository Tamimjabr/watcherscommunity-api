import { addUser } from './../respository/auth-respository';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express'

interface AuthControllerInterface {
  register (req: Request, res: Response, next: NextFunction): void;
}

export class AuthController implements AuthControllerInterface {
  async register (req: Request, res: Response, next: NextFunction) {
    try {
      const user = await addUser({
        email: req.body.email,
        password: req.body.password
      })
      console.log('====================================');
      console.log(user);
      console.log('====================================');
      res.status(201).json({
        userID: user._id
      })
    } catch (error: any) {
      let err = error
      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409, 'E-postadressen finns redan')
        err.innerException = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(
          400,
          Object.values(error.errors)
            .map((val: any) => val.message)[0]
            .toString()
        )
        err.innerException = error
      }
      next(err)
    }
  }

}
