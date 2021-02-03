import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import path from 'path';
import { createCellsRouter } from './routes/cells';

export const serveDocs = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean,
) => {
  const app = express();
  app.use(createCellsRouter(filename, dir));
  if (useProxy) {
    console.log('serving locally using proxy');
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      }),
    );
  } else {
    console.log(
      `Serving pre-installed version using static path and lerna module system`,
    );
    const packageBuildPath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packageBuildPath)));
  }

  return new Promise<void>((resolve, reject) => {
    app
      .listen(port, () => {
        console.log(`Served on port ${port}`);
        resolve();
      })
      .on('error', reject);
  });
};
