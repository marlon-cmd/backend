const pool = require('../config/database');

const getAllDept = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, created_at, updated_at FROM departments');
    res.json(rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDeptById = async (req, res) => {
  const { dept_id } = req.params;

  try {
    const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, created_at, updated_at FROM departments WHERE dept_id = ?', [dept_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'The department can not be found' });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createDept = async (req, res) => {
    const { dept_code, dept_name } = req.body;
  
    try {
      const [result] = await pool.query('INSERT INTO departments (dept_code, dept_name) VALUES (?, ?)', [dept_code , dept_name]);
      res.status(201).json({ dept_id: result.insertId, dept_code, dept_name });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const updateDept = async (req, res) => {
    const { dept_id } = req.params;
    const { dept_code, dept_name } = req.body;

    if (!dept_id || isNaN(Number(dept_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

      if (!dept_code || !dept_name) {
        return res.status(400).json({ error: 'department code/name are required' });
      }
      
    try {
      const [result] = await pool.query('UPDATE departments SET dept_code = ?, dept_name = ? WHERE dept_id = ?', [dept_code, dept_name, dept_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Can not update, department can not be found' });
      }
  
      res.json({ message: 'department updated successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const deleteDept = async (req, res) => {
    const { dept_id } = req.params;

    if (!dept_id || isNaN(Number(dept_id))) {
        return res.status(400).json({ error: 'Invalid or missing ID' });
      }

  
    try {
      const [result] = await pool.query('DELETE FROM departments WHERE dept_id = ?', [dept_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Department can not be found' });
      }
  
      res.json({ message: 'The department has been deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  module.exports = { getAllDept, getDeptById, createDept, updateDept, deleteDept };

  