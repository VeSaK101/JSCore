$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        //EDIT
        this.get('#/edit/:id', function (ctx) {
            let flightId = ctx.params.id.substr(1);
            flightsService.loadFlightDetails(flightId)
                .then(function (flightInfo) {
                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username')
                    ctx.img = flightInfo.img;
                    ctx.destination = flightInfo.destination
                    ctx.origin = flightInfo.origin
                    ctx.departureDate = flightInfo.departureDate
                    ctx.departureTime = flightInfo.departureTime
                    ctx.seats = flightInfo.seats
                    ctx.cost = flightInfo.cost
                    ctx.isAuthor = flightInfo._acl.creator === sessionStorage.getItem('userId')
                    ctx._id = flightId

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        editForm: './templates/edit/editForm.hbs'
                    }).then(function () {
                        this.partial('./templates/edit/editPage.hbs')
                    })
                }).catch(auth.handleError)
        })
        this.post('#/edit/:id', function (ctx) {
            let flightId = ctx.params.id.substr(1);

            let destination = ctx.params.destination
            let origin = ctx.params.origin
            let departureDate = ctx.params.departureDate
            let departureTime = ctx.params.departureTime
            let seats = ctx.params.seats
            let cost = ctx.params.cost
            let img = ctx.params.img
            let isPublic = ctx.params.public

            if (filled(destination, origin, departureDate, departureTime, seats, cost)) {
                flightsService.edit(flightId, destination, origin, departureDate, departureTime, seats, cost, img, isPublic)
                    .then(function (res) {
                        displayHome(ctx)
                        auth.showInfo('Flight edited successfully.')
                    }).catch(auth.handleError)
            }
            else {
                if (!destination) auth.showError('Destination too short!')
                else if (!origin) auth.showError('Origin too short!')
                else if (!departureDate) auth.showError('Must set departure date!')
                else if (Number(seats) <= 0) auth.showError('Seats should be positive!')
                else if (Number(cost) <= 0) auth.showError('Cost should be positive!')
            }

        })


        //MY FLIGHTS
        this.get('#/myFlights', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            flightsService.loadMyFlights().then(function (flights) {
                ctx.flights = flights;
                for (let i = 0; i < flights.length; i++) {
                    flights[i].departureDate = convertDate(flights[i].departureDate);
                }
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    myFlight: './templates/myFlights/myFlight.hbs'

                }).then(function () {
                    this.partial('./templates/myFlights/myFlights.hbs');
                })
            })
        })

        //REMOVE
        this.get('#/remove/:id', function (ctx) {
            let flightId = ctx.params.id.substr(1);
            requester.remove('appdata', `flights/${flightId}`, 'kinvey').then(function (res) {
                auth.showInfo('Flight deleted.');
                history.back();
            }).catch(auth.handleError)

        })
        //HOME
        this.get('index.html', displayHome)
        this.get('#/home', displayHome)

        //REGISTER
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
        })
        this.post('#/register', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.pass
            let repeatPassword = ctx.params.checkPass

            if (password === repeatPassword
                && password.length > 0
                && username.length >= 5) {
                auth.register(username, password)
                    .then(function (res) {
                        auth.saveSession(res)
                        auth.showInfo('User registration successful.')
                        displayHome(ctx)
                    }).catch(auth.handleError)
            }
            else {
                if (password !== repeatPassword)
                    auth.showError('Passwords do not match!')
                else if (password.length <= 0)
                    auth.showError('Password too short!')
                else if (username.length < 5)
                    auth.showError('Username too short!')

            }
        })

        //LOGOUT
        this.get('#/logout', function (ctx) {
            auth.logout()
            sessionStorage.clear()
            displayHome(ctx)
            auth.showInfo('Logout successful.')
        })

        //LOGIN
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
        })
        this.post('#/login', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.pass

            if (password.length > 0 && username.length >= 5) {

                auth.login(username, password)
                    .then(function (res) {
                        auth.saveSession(res)
                        auth.showInfo('Login successful.')
                        displayHome(ctx)
                    }).catch(auth.handleError)
            }
            else {
                if (password.length <= 0)
                    auth.showError('Password too short!')
                else if (username.length < 5)
                    auth.showError('Username too short!')

            }
        })

        //CREATE
        this.get('#/create', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'

            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            })
        })
        this.post('#/create', function (ctx) {
            let destination = ctx.params.destination
            let origin = ctx.params.origin
            let departureDate = ctx.params.departureDate
            let departureTime = ctx.params.departureTime
            let seats = ctx.params.seats
            let cost = ctx.params.cost
            let img = ctx.params.img
            let isPublic = ctx.params.public

            if (filled(destination, origin, departureDate, departureTime, seats, cost)) {
                flightsService.createFlight(destination, origin, departureDate, departureTime, seats, cost, img, isPublic)
                    .then(function (res) {
                        displayHome(ctx)
                        auth.showInfo('Created flight.')
                    }).catch(auth.handleError)
            }
            else {
                if (!destination) auth.showError('Destination too short!')
                else if (!origin) auth.showError('Origin too short!')
                else if (!departureDate) auth.showError('Must set departure date!')
                else if (Number(seats) <= 0) auth.showError('Seats should be positive!')
                else if (Number(cost) <= 0) auth.showError('Cost should be positive!')
            }

        })

        //Check if form is correctly filled
        function filled(destination, origin, departureDate, departureTime, seats, cost) {
            return destination.length > 0 && typeof destination === 'string' &&
                origin.length > 0 && typeof origin === 'string' &&
                departureDate.length === 10 &&
                departureTime.length === 5 &&
                Number(seats) > 0 &&
                Number(cost) > 0;

        }

        //DETAILS
        this.get(`#/:id`, function (ctx) {
            let flightId = ctx.params.id.substr(1);

            flightsService.loadFlightDetails(flightId)
                .then(function (flightInfo) {
                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username')
                    ctx.img = flightInfo.img;
                    ctx.destination = flightInfo.destination
                    ctx.origin = flightInfo.origin
                    ctx.departureDate = convertDate(flightInfo.departureDate)
                    ctx.departureTime = flightInfo.departureTime
                    ctx.seats = flightInfo.seats
                    ctx.cost = flightInfo.cost
                    ctx.isAuthor = flightInfo._acl.creator === sessionStorage.getItem('userId')
                    ctx._id = flightId

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/flight/details.hbs')
                    })
                }).catch(auth.handleError)
        })


        function displayHome(ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            if (ctx.loggedIn === true) {
                flightsService.loadFlights().then(function (flights) {
                    for (let i = 0; i < flights.length; i++) {
                        flights[i].departureDate = convertDate(flights[i].departureDate);
                    }
                    ctx.flights = flights;
                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                        flight: './templates/home/flight.hbs'
                    }).then(function () {
                        this.partial('./templates/home/home.hbs')
                    })
                })
            } else {
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/home/home.hbs')
                })
            }

        }

        //CONVERT DATE
        function convertDate(dateStr) {
            let date = new Date(dateStr);
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            return date.getDate() + ' ' + months[date.getMonth()];
        }
    });

    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    })
    app.run();
});


