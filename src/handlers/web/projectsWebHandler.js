"use strict";

const projects = require('../../dao/projects');
const technology = require('../../dao/technology');
const { check, validationResult } = require('express-validator');
const ProjectsWebHandler = function () {
};

ProjectsWebHandler.add = function (req, res) {
    res.render('pages/admin/addProject', {user: req.user, env: process.env});
};

ProjectsWebHandler.edit = function (req, res) {
    check('projectId', 'Invalid project id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error');
        return;
    }

    projects.findById(req.params.projectId, function (error, project) {
        if (error) {
            res.redirect('/error');
            return;
        } else {
            res.render('pages/admin/editProject', {user: req.user, project: project, env: process.env});
        }
    });
};

ProjectsWebHandler.addTechnology = function (req, res) {
    check('projectId', 'Invalid project id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error');
        return;
    }

    projects.findById(req.params.projectId, function (error, project) {
        if (error) {
            res.redirect('/error');
        } else {
            res.render('pages/addTechnologyToProject', {user: req.user, project: project, env: process.env});
        }
    });
};

ProjectsWebHandler.removeTechnology = function (req, res) {
    check('projectId', 'Invalid project id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error');
        return;
    }

    projects.findById(req.params.projectId, function (error, project) {
        if (error) {
            res.redirect('/error');
        } else {
            res.render('pages/removeTechnologyFromProject', {user: req.user, project: project, env: process.env});
        }
    });
};

ProjectsWebHandler.showRadar = function (req, res) {
    check('projectId', 'Invalid project id').isInt();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('/error');
        return;
    }

    projects.findById(req.params.projectId, function (error, project) {

        if (error) {
            res.redirect('/error');
            return;
        } else {
            technology.getAllForProject(project.id, function (error, technologies) {
                if (error) {
                    res.redirect('/error');
                } else {
                    res.render('pages/projectRadar', {
                        user: req.user,
                        project: project,
                        technologies: technologies,
                        env: process.env
                    });
                }
            });
        }
    });
};

ProjectsWebHandler.list = function (req, res) {

    // check if a project name parameter has been specified
    let name = req.query.name;

    if( name==undefined) {
        res.render('pages/searchProjects', {user: req.user, env: process.env});
    } else {
        name = decodeURI(name);

        projects.findByName( name , function( error , project ) {
            if (error) {
                res.redirect('/error');
            } else {
                res.redirect('/project/' + project.id)
            }
        })
    }

};

module.exports = ProjectsWebHandler;