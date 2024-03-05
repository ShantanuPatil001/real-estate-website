const NodeCaches = require("node-cache");
const cache = new NodeCaches();
const setCache = (key, value) => {
  cache.set(key, value, 3600);
};
const getCache = (key) => {
  cache.on("expired", (key, value) => {
    console.log(`${key} expired`);
  });
  return cache.get(key);
};
const checkCache = (key) => {
  return cache.has(key);
};
const deleteCache = (key) => {
  cache.del(key);
};

module.exports = {
  setCache,
  getCache,
  checkCache,
  deleteCache,
};
