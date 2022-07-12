const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');
const { employeePrompt } = require('../../server');

viewDepartments = () => {
  db.query(
    'SELECT * FROM departments;',
    (err, results) => {
      console.table(results);
    }
  )
}

module.exports = router;