import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}
export const createCellsRouter = (filename: string, filepath: string) => {
  const router = express.Router();
  router.use(express.json());

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(path.join(filepath, filename), {
        encoding: 'utf-8',
      });
      res.send(JSON.parse(result));
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(path.join(filepath, filename), '[]', 'utf-8');
        res.status(200).send([]);
      } else {
        throw error;
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(
      path.join(filepath, filename),
      JSON.stringify(cells),
      'utf-8',
    );
    res.send({ status: 'ok' });
  });
  return router;
};
