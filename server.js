const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password: 'password',
        database : 'project'
    }
});

db.select('*').from('users').then(data => {});



const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/register', (req, res) => {
    const {username_signup, email_signup, password_signup } = req.body;
    const hash = bcrypt.hashSync(password_signup);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email_signup
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: username_signup,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0])
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'));
 })

 app.listen(3030, () => console.log('listening at 3030'));