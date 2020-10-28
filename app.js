const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  try {
    res.send('create a form for police brutality');
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/v1/report', async (req, res) => {
  try {
    const allReport = await pool.query('SELECT * FROM form');
    res.json(allReport.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/v1/report', async (req, res) => {
  try {
    const { officer_name, amount, date_of_incident } = req.body;
    const newReport = await pool.query(
      'INSERT INTO form (officer_name, amount, date_of_incident) VALUES($1, $2, $3) RETURNING *',
      [officer_name, amount, date_of_incident]
    );
    res.json(newReport.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/v1/report/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const report = await pool.query('SELECT * FROM form WHERE id = $1', [id]);
    res.json(report.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.delete('/v1/report/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteReport = await pool.query('DELETE FROM form WHERE id = $1', [
      id,
    ]);
    res.json('form report successfully deleted.');
  } catch (error) {
    console.log(error.message);
  }
});

const PORT = process.env.PORT || 3000;

app.listen(`${PORT}`, () => {
  console.log(`app listening on port ${PORT}`);
});
