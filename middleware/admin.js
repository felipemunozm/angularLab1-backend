'use strict'

exports.isAdmin = (req, res, next) => {
    if (req.user.role != 'ROLE_ADMIN')
        return res.status(401).send({ message: "FORBBIDEN, no tienes acceso a esta zona" })
    next()
}