const NodeCache = require('node-cache');

class CacheService {
    constructor() {
        this.cache = new NodeCache({
            stdTTL: 300, // 5 minutes default TTL
            checkperiod: 60, // Check for expired keys every 60 seconds
        });
    }

    get(key) {
        return this.cache.get(key);
    }

    set(key, value, ttl = 300) {
        return this.cache.set(key, value, ttl);
    }

    del(key) {
        return this.cache.del(key);
    }
}

module.exports = new CacheService();