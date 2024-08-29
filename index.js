import express from "express"
import morgan from "morgan"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const app = express()
const port = 3000

app.use(morgan("dev"))


// =============== Section 7: Loading Static Files ===============

// Get the current file path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the "client/dist" directory
const staticPath = join(__dirname, './client/dist');
app.use(express.static(staticPath));

// Serve the index.html file for all other routes
app.get('*', function (_, res) {
  const indexPath = join(__dirname, './client/dist/index.html');
  res.sendFile(indexPath, function (err) {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send(err);
    }
  });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})