const express = require("express");
const next = require("next");
const { NestFactory } = require("@nestjs/core");
const { AppModule } = require("./back/dist/app.module");

const dev = false;
const app = next({ dev, dir: "./front" });
const handle = app.getRequestHandler();

async function bootstrap() {
  await app.prepare();

  const server = express();

  // 🔥 Crear Nest usando el MISMO servidor Express
  const nestApp = await NestFactory.create(AppModule, server);
  nestApp.enableCors({ origin: "*" });
  await nestApp.init();

  // NextJS maneja todo lo demás
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  });
}

bootstrap();