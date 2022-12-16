"use strict";

const cache = require('../../dao/cache.js');
const project = require('../../dao/projects');
const technology = require('../../dao/technology');
const usedThis = require('../../dao/usedThisTechnology');
const { check, validationResult } = require('express-validator');
const TechnologiesWebHandler = function () {
};

TechnologiesWebHandler.listTechnologies = function (req, res) {
    res.render('pages/admin/listTechnologies', {user: req.user, env: process.env});
};

TechnologiesWebHandler.search = function (req, res) {
    res.render('pages/searchTechnologies', {user: req.user, env: process.env});
};

TechnologiesWebHandler.add = function (req, res) {
    res.render('pages/addTechnology', {categories: cache.getCategories(), user: req.user, env: process.env});
};

TechnologiesWebHandler.edit = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.redirect('/error#1');
        return;
    }
    console.log('userId: '+ req.user.id)
    const num = req.params.id;
    technology.getById(req.user.id, num, function (value) {
        if (value == null || value.length === 0 || value.length > 1) {
            res.redirect('/error#2');
        } else {

            const statuses = cache.getStatuses();
            res.render('pages/editTechnology', {
                technology: value,
                user: req.user,
                statuses: statuses,
                env: process.env
            });
        }
    });
};

TechnologiesWebHandler.getVersions = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error#3');
        return;
    }

    const num = req.params.id;
    technology.getById(req.user.id, num, function (value) {
        if (value == null || value.length === 0 || value.length > 1) {
            res.redirect('/error#4');
        } else {
            res.render('pages/editVersions', {
                technology: value,
                user: req.user,
                env: process.env
            });
        }
    });
};

TechnologiesWebHandler.getTechnology = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req)
    console.info(
        `validation results: ${JSON.stringify(
            errors,
        )}, is empty? ${errors.isEmpty()}`,
    );

    if (!errors.isEmpty()) {
        res.redirect('/error#5');
        return;
    }


    const num = req.params.id;

    technology.getById(req.user.id, num, function (value) {
        if (value == null || value.length === 0 || value.length > 1) {
            res.redirect('/error#6');
        } else {
            const statuses = cache.getStatuses();
            const usedThisOptions = cache.getUsedThisTechOptions();
            res.render('pages/technology', {
                technology: value,
                user: req.user,
                statuses: statuses,
                usedThisOptions: usedThisOptions,
                env: process.env
            });
        }
    });
};

TechnologiesWebHandler.getUsers = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error#7');
        return;
    }


    const num = req.params.id;

    technology.getById(req.user.id, num, function (value) {
        usedThis.getUsersForTechnology(num, null, function (users) {
            if (value == null || value.length === 0 || value.length > 1) {
                res.redirect('/error#8');
            } else {
                res.render('pages/technologyUsers', {
                    technology: value,
                    user: req.user,
                    techUsers: users,
                    env: process.env
                });
            }
        });
    });
};

TechnologiesWebHandler.getStatusHistory = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error#9');
        return;
    }

    const techId = req.params.id;

    technology.getById(req.user.id, techId, function (value) {

        if (value == null || value.length === 0) {
            res.redirect('/error#10');
        } else {
            res.render('pages/statushistory', {
                technology: value,
                user: req.user, env: process.env
            });
        }
    });
};

TechnologiesWebHandler.getVotes = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error#11');
        return;
    }

    const techId = req.params.id;

    technology.getById(req.user.id, techId, function (value) {

        if (value == null || value.length === 0) {
            res.redirect('/error#12');
        } else {
            res.render('pages/votehistory', {
                technology: value,
                user: req.user, env: process.env
            });
        }
    });
};

TechnologiesWebHandler.updateStatus = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error#13');
        return;
    }

    const techId = req.params.id;

    technology.getById(req.user.id, techId, function (value) {
        if (value == null || value.length === 0) {
            res.redirect('/error#14');
            return;
        }

        const statuses = cache.getStatuses();
        res.render('pages/updateStatus', {
            technology: value,
            user: req.user,
            statuses: statuses,
            env: process.env
        });
    });
};

TechnologiesWebHandler.addProject = function (req, res) {
    check('id', 'Invalid technology id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error#15');
        return;
    }

    const techId = req.params.id;

    technology.getById(req.user.id, techId, function (technology) {
        if (technology === null) {
            res.redirect('/error#16');
        } else {
            project.getAllForTechnology(techId, function (linkedProjects) {

                project.getAll(function (allProjects) {
                    res.render('pages/addProjectToTechnology', {
                        technology: technology,
                        user: req.user, env: process.env,
                        unassignedProjects: allProjects.filter(function (e) {
                            return linkedProjects.map(function (linkedEl) {
                                return linkedEl.id
                            }).indexOf(e.id) === -1;
                        })
                    });
                });
            });
        }
    });
};

module.exports = TechnologiesWebHandler;