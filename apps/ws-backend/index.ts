import { WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/client";

const ws = new WebSocketServer({ port: 8081 });

ws.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    prismaClient.user.create({
      data: {
        username: "new_user-socket",
        password: "password123",
      },
    });

    socket.send(message);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
