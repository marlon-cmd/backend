const express = require('express');
const { getAllDept, getDeptById, createDept, updateDept, deleteDept} = require('../controllers/deptControllers');

const router =  express.Router();

router.get('/', getAllDept);
router.get('/:dept_id', getDeptById);
router.post('/', createDept);
router.put('/:dept_id', updateDept);
router.delete('/:dept_id', deleteDept);

module.exports = router;