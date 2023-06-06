const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');
const tasksController = require('../controllers/tasks_controller')

router.get('/',homeController.home);

router.get('/delete',tasksController.delete_task);

router.post('/add',tasksController.add_task);

module.exports = router;