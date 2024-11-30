const pool = require('../config/database');

const getAllStudent = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT student_id, lname, fname, mname, created_at, updated_at FROM students');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStudentById = async (req, res) => {
  const { student_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT student_id, lname, fname, mname,  created_at, updated_at FROM students WHERE student_id = ?', [student_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'The student can not be found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createStudent = async (req, res) => {
    const { lname, fname, mname } = req.body;
  
    try {
      const [result] = await pool.query('INSERT INTO students (lname, fname, mname) VALUES (?, ?, ?)', [lname, fname, mname]);
      res.status(201).json({ student_id: result.insertId, lname, fname, mname });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const updateStudent = async (req, res) => {
    const { student_id } = req.params;
    const { lname, fname, mname } = req.body;

    if (!student_id || isNaN(Number(student_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

      if (!lname || !fname || !mname) {
        return res.status(400).json({ error: 'student info are required' });
      }
      
    try {
      const [result] = await pool.query('UPDATE students SET lname = ?, fname = ?, mname = ? WHERE student_id = ?', [lname, fname, mname, student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Can not update, student can not be found' });
      }
  
      res.json({ message: 'student updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteStudent = async (req, res) => {
    const { student_id } = req.params;

    if (!student_id || isNaN(Number(student_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

  
    try {
      const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Student can not be found' });
      }
  
      res.json({ message: 'The Student has been deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { getAllStudent, getStudentById, createStudent, updateStudent, deleteStudent };

  