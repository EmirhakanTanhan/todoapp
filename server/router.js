import express from 'express';
import TaskCtrl from './controllers/taskContoller.js';
import AuthCtrl from "./controllers/authController.js";
import TagCtrl from "./controllers/tagController.js";

const router = express.Router();

// ## Authorization Operations ##
router.route('/signup').post(AuthCtrl.apiSignupUser); //Login user
router.route('/login').post(AuthCtrl.apiLoginUser); //Login user
router.route('/logout').post(AuthCtrl.apiLogoutUser); //Logout user
router.route('/token').post(AuthCtrl.apiRefreshAuth); //Get a new access token

// ## Tag Operations ##
router.route('/tags')
    .get(TagCtrl.apiGetTags) //Get all tags

// ## To-do Operations ##
router.route('/todos').post(TaskCtrl.apiCreateTodo); //Create a to-do
router.route('/todos/:id')
    .put(TaskCtrl.apiUpdateTodo) //Update a to-do
    .delete(TaskCtrl.apiDeleteTodo); //Delete a to-do
router.route('/todos/:user_email').get(TaskCtrl.apiGetTodos) //Get to-dos of a user

export default router;