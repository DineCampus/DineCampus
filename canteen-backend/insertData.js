// insertData.js
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'canteen_db'
});

const storeDataPath = path.join(__dirname, 'storeData.json');
const storeData = JSON.parse(fs.readFileSync(storeDataPath, 'utf8'));

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');

    // Clear existing data
    connection.query('DELETE FROM items', (err) => {
        if (err) throw err;
        connection.query('DELETE FROM stores', (err) => {
            if (err) throw err;

            const now = new Date();
            let totalQueries = 0;
            let completedQueries = 0;

            const checkCompletion = () => {
                completedQueries++;
                if (completedQueries === totalQueries) {
                    connection.end();
                    console.log('All data inserted and connection closed');
                }
            };

            storeData.forEach(store => {
                const { id, name, icon, items } = store;
                totalQueries++;

                connection.query('INSERT INTO stores (id, name, icon, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)', [id, name, icon, now, now], (err, result) => {
                    if (err) throw err;
                    console.log(`Inserted store: ${name}`);

                    items.forEach(item => {
                        const { id, name, description, price, weight, quantity, image } = item;
                        totalQueries++;

                        connection.query('INSERT INTO items (id, store_id, name, description, price, weight, quantity, image, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [id, store.id, name, description, price, weight, quantity, image, now, now], (err, result) => {
                            if (err) throw err;
                            console.log(`Inserted item: ${name}`);
                            checkCompletion();
                        });
                    });

                    checkCompletion();
                });
            });
        });
    });
});
