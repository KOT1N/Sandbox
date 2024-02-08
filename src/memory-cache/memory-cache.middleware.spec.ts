import { MemoryCacheMiddleware } from './memory-cache.middleware';

describe('MemoryCacheMiddleware', () => {
  it('should be defined', () => {
    expect(new MemoryCacheMiddleware()).toBeDefined();
  });
});
