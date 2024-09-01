/**
 * This file conatins all file system operations needed in the project
 */

import { promises as fs } from 'fs';

/**
 * Reading data from a file
 * @param {string} filePath 
 * @returns a JavaScript object
 */
async function readFileData(filePath) {
    try {
        // reading the file asynchronously
        const fileContent = await fs.readFile(filePath, 'utf8');
        // parsing the JSON string into a JasvaScript object
        return JSON.parse(fileContent);
    } catch (err) {
        const intialData = [];
        // if file doesn't exists we create it
        await writeFileData(filePath, intialData);
        return intialData;
    }
}

/**
 * Writing data into a file
 * automatically create a file if not exists
 * @param {string} filePath 
 * @param {[{id: string, description: string, status: string}]} data 
 */
async function writeFileData(filePath, data) {
    try {
        // writing to file asynchronously
        await fs.writeFile(filePath, JSON.stringify(data), 'utf8');
    } catch (err) {
        throw new Error(`Error writing file: ${err}`)
    }
}

export {
    readFileData,
    writeFileData
}