"use strict";

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const security = require('../../utils/security.js');
const handler = require('../../handlers/api/projectsApiHandler');

const ApiProjectRoutes = function () {
};

ApiProjectRoutes.createRoutes = function (self) {

    /**
     * Get all projects
     */
    self.app.get('/api/projects', security.isAuthenticated, handler.getProjects );

    /**
     * Add a new project
     */
    self.app.post('/api/project', security.canEdit, jsonParser, handler.addProject );

    /**
     * Delete projects from the database
     */
    self.app.delete('/api/project', security.isAuthenticatedAdmin, jsonParser,handler.deleteProject );

    /**
     * Delete a set of technologies from a project
     */
    self.app.delete('/api/project/:projectId/technology', security.canEdit, jsonParser, 
        handler.deleteTechnologiesFromProject);

    /**
     * Update software version in a technology - project link
     */
    self.app.put('/api/link/:linkId/version', security.canEdit, jsonParser, handler.updateTechnologyVersion);

    /**
     * Get all technologies associated with projects
     */
    self.app.get('/api/project/:projectId/technologies', security.canEdit,  handler.getTechnologiesForProject );

    /**
     * Add a set of technologies to a project
     */
    self.app.post('/api/project/:projectId/technology', security.canEdit, jsonParser, handler.addTechnologyToProject );

    /**
     * Update project
     */
    self.app.put('/api/project', security.canEdit, handler.updateProject );

};

module.exports = ApiProjectRoutes;