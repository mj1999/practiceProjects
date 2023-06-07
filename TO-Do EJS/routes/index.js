const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controller');                                   //home controller module loaded
const tasksController = require('../controllers/tasks_controller')                                  //task conrroller module loaded

router.get('/',homeController.home);                                                            // request diverted to home controller modules

router.get('/delete',tasksController.delete_task);                                                  // request diverted to task controller modules

router.post('/add',tasksController.add_task);

module.exports = router;