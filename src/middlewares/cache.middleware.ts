import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
@Injectable()
export class CacheMiddleware implements NestMiddleware {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cachedResponse = await this.cacheManager.get(req.url);
    if (cachedResponse) {
      return res.send(cachedResponse);
    } else {
      res.locals.cache = this.cacheManager;
      next();
    }
  }
}
