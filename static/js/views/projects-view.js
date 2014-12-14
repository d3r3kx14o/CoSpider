var app = app || {};
(function () {
    'use strict';
    app.ProjectsView = Backbone.View.extend({
        el: '#projects',
        events: {
            'click .projects-on': 'projects',
            //'click .project-cover': 'into-project',
            //'mouseover .project-cover': 'show',
        },
        initialize: function (opt) {
            var el = this.$el;
            this.$table = el.find('#projects-table');
            this.listenTo(this.collection, "add", this.addOne);
        },

        clear: function () {
            this.$table.empty();
        },

        render: function () {
            this.clear();
            if (!app.isLogined) {
                window.location.href = "#login";
                return;
            }
            app.views['account'].show();

            var tailProject = new app.Project({
                name: 'New Project',
                introduction: '',
                notnew: false,
            });
            var projects = [];
            projects.push(tailProject);

            this.collection.forEach(function (project) {
                projects.push(new app.Project({
                    name: project.get('name'),
                    introduction: project.get('introduction'),
                    notnew: true,
                }))
            });

            var view = this;
            var colNum = Math.floor(projects.length / 4) + 1;
            projects.forEach(function (project, i) {
                //console.log(i + ": " + i % colNum + ": " + colNum);
                view.addOne(project, i % colNum);
            });
        },

        create: function (project) {
            
        },

        addOne: function (project, row) {
            var colElem;
            if (row == 0) {
                colElem = $('<tr>').appendTo(this.$table);
                //this.$table.children().last().append(colElem);
            } else {
                colElem = this.$table.children().last().children().last();
            }
            var pro = new app.ProjectInfoView({
                model: project,
            });
            colElem.append(pro.render().el);
        },
    });
    app.init || (app.init = {});
    app.init.projectsView = function () {
        if (app.views['projects']) {
            return;
        }
        app.collections['projects'] || app.init.projects();
        app.views['projects'] = new app.ProjectsView({
            collection: app.collections['projects'],
        });
    };
})();