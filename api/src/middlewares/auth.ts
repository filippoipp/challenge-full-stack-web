import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/jwt.utils';

const authorize = () => async (req: Request, res: Response, next: NextFunction) => {
  try {
    let jwt = req.headers.authorization;

    if (!jwt) {
      return res.status(401).json({ message: 'Invalid token ' });
    }

    if (jwt.toLowerCase().startsWith('bearer')) {
      jwt = jwt.slice('bearer'.length).trim();
    }

    await validateToken(jwt);

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Expired token' });
    }

    res.status(500).json({ message: 'Failed to authenticate user' });
  }
};

export default authorize;
