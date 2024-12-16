const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const feedback = async (req, res) => {
    const { feedback_type, feedback_text, rating } = req.body;
  
    try {
      const [result] = await pool.query('INSERT INTO feedback ( feedback_type, feedback_text, rating) VALUES (?, ?, ?)', [feedback_type, feedback_text, rating]);
      res.status(201).json({ student_id: result.insertId, lname, fname, mname });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  module.exports = {feedback};