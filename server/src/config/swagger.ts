import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Activity API",
      version: "1.0.0",
      description: "API for tracking user activities with WebSockets",
    },
    servers: [
      {
        url: "http://localhost:8080",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/modules/*/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger Docs available at: http://localhost:8080/api-docs");
};
