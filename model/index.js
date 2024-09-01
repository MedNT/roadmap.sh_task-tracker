/**
 * 
 * @param {number} id 
 * @param {string} description 
 * @param {enum} status 
 * @param {timestamp} createdAt 
 * @param {timestamp} updatedAt 
 * @param {timestamp} deletedAt 
 * @returns 
 */
function createTask(id, description, status, createdAt, updatedAt, deletedAt) {
    return {
        id,
        description,
        status,
        createdAt,
        updatedAt,
        deletedAt
    }
}

export {
    createTask
}