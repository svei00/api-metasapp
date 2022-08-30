const db = require('./config');

// Select all the registers SELECT * FROM
function getAll(table, callback) {
    db.any(`SELECT * FROM ${table}`)
    .then(result => {
        callback(null, result);
    })
    .catch(error => {
        callback(error)
    });
}

// Ask One Item SELECT * FROM table WHERE id = id
function getItem(table, id, callback) {
    db.any(`SELECT * FROM ${table} WHERE id = ${id}`)
    .then(results => {
        callback(null, results);
    })
    .catch(error => {
        callback(error);
    });
}

// Ask One Item SELECT * FROM table WHERE id = id
function getUser(username, callback) {
    db.any(`SELECT * FROM accounts WHERE username = '${username}'`)
    .then(results => {
        callback(null, results);
    })
    .catch(error => {
        callback(error);
    });
}

// Create Goal INSERT INTO table_name (column1, column2, column3, ...) VALUES (value1, value2, value3, ...);
// We use it to create a Goal and a User
function create(table, item, callback) {
    const keys = Object.keys(item);
    const properties = keys.join(', ');
    const values = keys.map(key => `'${item[key]}'`).join(', ');

    db.any(`INSERT INTO ${table} (${properties}) VALUES (${values}) returning *`)
    .then(([result]) => {
        callback(null, result);
    })
    .catch(error => {
        callback(error);
    });
}

//Update Goal: UPDATE table SET value WHERE id = id;
function update(table, id, item, callback) {
    const keys =  Object.keys(item);
    const updates = keys.map(key => `${key} = '${item[key]}'`).join(', ');

    const sql = `UPDATE ${table} SET ${updates} WHERE id = ${id} returning *`;
    db.any(sql)
        .then(([result]) => {
            callback(null, result);
        })
        .catch(error => {
            callback(error);
        });
}

// Delete: DELETE FROM table WHERE id = id
function delGoal(table, id, callback) {
    db.any(`DELETE FROM ${table} WHERE id = ${id}`)
        .then(() => {
            callback(null);
        })
        .catch(error => {
            callback(error);
        });
}

module.exports = {
    getAll,
    getItem,
    create,
    update,
    delGoal,
    getUser 
};