const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (passwotd, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(passwotd, salt, null, (err, hash) => callback(hash))
        })
    }

    const save = (req, res) => {
        obterHash(req.body.passwotd, hash => {
            const passwotd = hash

            app.db('users')
                .insert({ 
                    name: req.body.name, email: req.body.email.toLowerCase(), passwotd
                })
                .then(_ => res.status(204).send())
                .catch(err => res.status(400).json(err))
        })
    }

    return { save }
}
