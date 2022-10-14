import express from "express";

const server = express();

server.get("/", (_, res) => {
  return res.send("hello word!");
});

export { server };
