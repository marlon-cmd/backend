const pool = require('../config/database');

const getAllCourse = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT course_id, course_code, course_name, created_at, updated_at FROM course');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCourseById = async (req, res) => {
  const { course_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT course_id, course_code, course_name, created_at, updated_at FROM course WHERE course_id = ?', [course_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'The course can not be found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createCourse = async (req, res) => {
    const { course_code, course_name } = req.body;
  
    try {
      const [result] = await pool.query('INSERT INTO course (course_code, course_name) VALUES (?, ?)', [course_code , course_name]);
      res.status(201).json({ course_id: result.insertId, course_code, course_name });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const updateCourse = async (req, res) => {
    const { course_id } = req.params;
    const { course_code, course_name } = req.body;

    if (!course_id || isNaN(Number(course_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

      if (!course_code || !course_name) {
        return res.status(400).json({ error: 'course code/name are required' });
      }
      
    try {
      const [result] = await pool.query('UPDATE course SET course_code = ?, course_name = ? WHERE course_id = ?', [course_code, course_name, course_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Can not update, course can not be found' });
      }
  
      res.json({ message: 'course updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteCourse = async (req, res) => {
    const { course_id } = req.params;

    if (!course_id || isNaN(Number(course_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

  
    try {
      const [result] = await pool.query('DELETE FROM course WHERE course_id = ?', [course_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Course can not be found' });
      }
  
      res.json({ message: 'The course has been deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { getAllCourse, getCourseById, createCourse, updateCourse, deleteCourse };

  