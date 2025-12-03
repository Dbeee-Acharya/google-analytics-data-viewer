import { Redis } from 'ioredis';
import { config } from '../config.js';

let redis: Redis | null = null;

if (config.redis.url) {
    redis = new Redis(config.redis.url);
} else {
    redis = new Redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
    });
}

redis.on('error', (err: Error) => {
    console.error('Redis connection error:', err);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

export default redis;
