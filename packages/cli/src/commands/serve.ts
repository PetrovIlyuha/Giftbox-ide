import path from 'path';
import { Command } from 'commander';
import { serveDocs } from 'local-api';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'giftbox.js', options: { port: string }) => {
    try {
      const filepath = path.join(process.cwd(), path.dirname(filename));
      await serveDocs(
        parseInt(options.port),
        path.basename(filename),
        filepath,
      );
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit your giftbox notebook`,
      );
    } catch (error) {
      if (error.code === 'EADDRINUSE') {
        console.error(
          `Port is in use. Try running on a different port. Example: node ${path.basename(
            filename,
          )} serve --port 5000`,
        );
      } else {
        console.log(`There is a problem. ${error.message}`);
      }
      process.exit(1);
    }
  });
