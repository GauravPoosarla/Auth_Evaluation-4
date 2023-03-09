const redis = require("redis");
const jwt = require("jsonwebtoken");

const config = {
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT,
  },
};

const redisConnect = async (config) => {
  try {
    const client = redis.createClient(config);
    await client.connect();

    return client;
    // return new Promise((resolve, reject) => {
    //   const client = redis.createClient(config);
    //   console.log("here");

    //   client.on("error", (err) => {
    //     reject(err);
    //   });
    // });
  } catch (error) {
    console.log(error);
    throw new Error("redis connection error");
  }
};

// const redisClient = redis.createClient(config);
// redisClient.connect().then(() => {
//   console.log("Redis connected");
// });

function generateToken(username) {
  const payLoad = {
    username,
    timestamp: new Date().getTime(),
  };
  return jwt.sign(payLoad, process.env.SECRET_KEY);
}

async function putToken(token) {
  const redisClient = await redisConnect(config);
  await redisClient.set(token, "true", "EX", 60 * 60 * 24);
}

async function checkTokenExists(token) {
  const redisClient = await redisConnect(config);
  return await redisClient.get(token);
}

module.exports = {
  generateToken,
  putToken,
  checkTokenExists,
};
