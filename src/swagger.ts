import { SwaggerOptions } from "swagger-ui-express";

export const swaggersetting: SwaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description: "a api for blog app"
        },
        servers: [
            {
                url: "http://loaclhost/3000" 
            }
        ]
    },
    apis: ["./**/*.routes.ts", "./**/**/*.routes.ts"]
} 