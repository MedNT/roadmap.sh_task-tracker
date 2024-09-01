import { readFileData, writeFileData } from "../utils/index.js";
import { createTask } from "../model/index.js";
import { Status } from "../helpers/constants.js";

// database URI
const db = './data.json';

/**
 * Adding a new task
 * @param {string} taskDescription 
 */
async function addTask(taskDescription) {
    // getting current file data
    const data = await readFileData(db);
    // adding a new task to the list of tasks
    data.push(createTask(data.length, taskDescription, Status.TODO, Date.now(), null));
    // storing data into file
    writeFileData(db, data);
}

/**
 * Updating a task
 * @param {number} taskId 
 * @param {string} taskDescription 
 */
async function updateTask(taskId, taskDescription) {
    // getting current file data
    const data = await readFileData(db);
    // looking for the task by ID
    const task = data.findOne((task) => task.id === taskId);
    // updating the task if exists
    if(task) {
        task.description = taskDescription;
        task.updatedAt = Date.now();
    }
    // storing data into file
    writeFileData(db, data);
}

/**
 * Deleting a task (hard delete)
 * @param {number} taskId 
 */
async function removeTask(taskId) {
    // getting current file data
    const data = await readFileData(db);
    // looking for the task index by ID
    const indexToRemove = data.findIndex(task => task.id === taskId);
    // removing the task from the list
    data.splice(indexToRemove, 1);
    // storing data into file
    writeFileData(db, data);
}

/**
 * Deleting a task (soft delete)
 * @param {number} taskId
 */
async function deleteTask(taskId) {
    // getting current file data
    const data = await readFileData(db);
    // looking for the task by ID
    const task = data.findOne((task) => task.id === taskId);
    // updating the task if exists
    if(task) {
        task.deletedAt = Date.now();
    }
    // storing data into file
    writeFileData(db, data);
}

/**
 * Marking task as "in progress"
 * @param {number} taskId 
 */
async function markTaskInProgress(taskId) {
    // getting current file data
    const data = await readFileData(db);
    // looking for the task index by ID
    const task = data.findOne(task => task.id === taskId);
    // updating the task if exists
    if(task) {
        task.status = Status.INPROGRESS;
    }
    // storing data into file
    writeFileData(db, data);
}

/**
 * Marking task as "done"
 * @param {number} taskId 
 */
async function markTaskDone(taskId) {
    // getting current file data
    const data = await readFileData(db);
    // looking for the task index by ID
    const task = data.findOne(task => task.id === taskId);
    // updating the task if exists
    if(task) {
        task.status = Status.DONE;
    }
    // storing data into file
    writeFileData(db, data);
}

/**
 * Listing all tasks
 */
async function listAllTasks() {
    return await readFileData(db);
}

/**
 * Listing all "done" tasks
 */
async function listAllDoneTasks() {
    return await readFileData(db).filter(task => task.status === Status.DONE);
}

/**
 * Listing all "todo" tasks
 */
async function listAllTodoTasks() {
    return await readFileData(db).filter(task => task.status === Status.TODO);
}

/**
 * Listing all "in progress" tasks
 */
async function listAllInProgressTasks() {
    return await readFileData(db).filter(task => task.status === Status.INPROGRESS);
}

/**
 * Listing tasks by status
 * @param {string} status: ['todo', 'in-progress', 'done']
 * @returns 
 */
function listTaskByStatus(status) {
    switch (status) {
        case "done": return listAllDoneTasks();
        case "todo": return listAllTodoTasks();
        case "in-progress": return listAllInProgressTasks();
        default: throw new Error("Unrecognized Status! \n Status should be one of the following elements: ['todo', 'in-progress', 'done'].");
    }
}

export {
    addTask,
    updateTask,
    deleteTask,
    removeTask,
    listAllTasks,
    listTaskByStatus,
    markTaskDone,
    markTaskInProgress,
}