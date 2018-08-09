$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        // HOMEPAGE
        this.get('index.html', displayHome)
        this.get('#/home', displayHome)

        // REGISTER FUNCS
        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            })
        });
        this.post('#/register', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password
            let repeatPassword = ctx.params.repeatPassword

            if (password === repeatPassword && password.length > 0) {
                auth.register(username, password)
                    .then(function (res) {
                        auth.saveSession(res)
                        displayHome(ctx)
                    }).catch(auth.handleError)
            }
            else {
                auth.showError('Passwords do not match!')
            }
        })

        // LOGIN FUNCS
        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            })
        });
        this.post('#/login', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password

            auth.login(username, password)
                .then(function (res) {
                    auth.saveSession(res)
                    displayHome(ctx)
                }).catch(auth.handleError)
        })

        // LOGOUT
        this.get('#/logout', function (ctx) {
            auth.logout()
            sessionStorage.clear()
            displayHome(ctx)
        })

        // ABOUT
        this.get('#/about', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/about/about.hbs')
            })
        })

        // CATALOG
        this.get('#/catalog', displayCatalog)

        // Create team
        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');

            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs')
            })
        })
        this.post('#/create', function (ctx) {
            let name = ctx.params.name
            let comment = ctx.params.comment

            teamsService.createTeam(name, comment)
                .then(function (res) {
                    teamsService.joinTeam(res._id)
                        .then(function (userInfo) {
                            auth.saveSession(userInfo);
                            displayCatalog(ctx)
                        }).catch(auth.handleError)

                }).catch(auth.handleError)
        })

        // teamDetails
        this.get(`#/catalog/:id`, function (ctx) {
            let teamId = ctx.params.id.substr(1);

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username')
                    ctx.teamId = teamId;
                    ctx.name = teamInfo.name
                    ctx.comment = teamInfo.comment
                    ctx.isOnTeam = teamId === sessionStorage.getItem('teamId')
                    ctx.isAuthor = teamInfo._acl.creator === sessionStorage.getItem('userId')
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        teamControls: './templates/catalog/teamControls.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/details.hbs')
                    })
                }).catch(auth.handleError)
        })

        //LEAVE ACTION
        this.get('#/leave',function (ctx) {
            teamsService.leaveTeam()
                .then(function (res) {
                    auth.saveSession(res)
                    displayCatalog(ctx)
                })
        })
        //JOIN ACTION
        this.get('#/join/:id',function (ctx) {
            let teamId = ctx.params.id.substr(1);
            teamsService.joinTeam(teamId).then(function (userInfo) {
                auth.saveSession(userInfo)
                displayCatalog(ctx)
            })

        })
        //EDIT DETAILS
        this.get('#/edit/:id',function (ctx) {
            let teamId = ctx.params.id.substr(1)

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username');
                    ctx.teamId = teamId
                    ctx.name = teamInfo.name
                    ctx.comment = teamInfo.comment
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs')
                    })
                })

        })

        this.post('#/edit/:id',function (ctx) {
            let teamId = ctx.params.id.substr(1)

            teamsService.loadTeamDetails(teamId)
                .then(function (teamInfo) {
                    let name = teamInfo.name
                    let comment = teamInfo.comment
                    teamsService.edit(teamId,name,comment)
                        .then(function (res) {
                        displayCatalog(ctx)
                    })
                }).catch(auth.handleError)
        })






        function displayCatalog(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            teamsService.loadTeams()
                .then(function (teams) {
                    ctx.hasNoTeam = sessionStorage.getItem('teamId') === null
                        || sessionStorage.getItem('teamId') === 'undefined';
                    ctx.teams = teams;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        team: './templates/catalog/team.hbs'
                    }).then(function () {
                        this.partial('./templates/catalog/teamCatalog.hbs')
                    })
                })
        }

        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/home/home.hbs')
            })
        }
    });

    app.run();
});