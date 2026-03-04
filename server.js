const express = require("express");
const next = require("next");
const { NestFactory } = require("@nestjs/core");
const { AppModule } = require("./backend/dist/app.module");

const dev = false;
const app = next({ dev, dir: "./frontend" });
const handle = app.getRequestHandler();

async function bootstrap() {
  await app.prepare();

  const server = express();

  // Levantar Nest dentro del mismo proceso
  const nestApp = await NestFactory.create(AppModule);
  nestApp.enableCors({ origin: "*" });
  await nestApp.init();

  server.use("/api", nestApp.getHttpAdapter().getInstance());

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(process.env.PORT || 3000, () => {
    console.log("Servidor corriendo");
  });
}

bootstrap();