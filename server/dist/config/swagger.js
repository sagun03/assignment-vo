"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
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
                url: "http://localhost:9004",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/modules/*/*.ts"],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(swaggerOptions);
const setupSwagger = (app) => {
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    console.log("📄 Swagger Docs available at: http://localhost:9004/api-docs");
};
exports.setupSwagger = setupSwagger;
