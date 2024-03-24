import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4444;


async function runServer() {
  app.use(cors());
  app.use(express.json());
  app.get('/', (req, res) => {
    res.send("Hello World!");
  })

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

runServer().catch((e) => {
  console.error('Failed to start the server:', e);
});
