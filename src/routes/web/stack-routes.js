"use strict";

/**
 * The 'Stack' feature has not yet been implemented
 */

const security = require('../../utils/security');

const StackRoutes = function () {
};


StackRoutes.createRoutes = function (self) {

    /**
     * Stack builder
     */
    self.app.get('/stacks', security.isAuthenticated, function (req, res) {
        res.render('pages/listStacks', {user: req.user, env: process.env});
    });

    self.app.get('/stack/add', security.isAuthenticated, function (req, res) {
        res.render('pages/addStack', {user: req.user, env: process.env});
    });

}

module.exports = StackRoutes;