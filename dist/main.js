"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: '*',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const PORT = process.env.PORT || 3001;
    await app.listen(PORT);
    console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map