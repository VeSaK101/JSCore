$(() => {
    const app = Sammy('#container', function () {
        this.use('Handlebars', 'hbs');

        // DETAILS
        this.get(`#/details/:id`, function (ctx) {
            let carId = ctx.params.id.substr(1);

            cars.loadCarDetails(carId)
                .then(function (carInfo) {

                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username')
                    ctx.title = carInfo.title
                    ctx.description = carInfo.description
                    ctx.brand = carInfo.brand
                    ctx.model = carInfo.model
                    ctx.year = carInfo.year
                    ctx.imageUrl = carInfo.imageUrl
                    ctx.fuel = carInfo.fuel
                    ctx.price = carInfo.price
                    ctx.seller = carInfo.seller
                    ctx.isCreator = carInfo._acl.creator === sessionStorage.getItem('userId')
                    ctx._id = carId

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/details/details.hbs')
                    })
                })
        })

        //DELETE
        this.get('#/delete/:id', function (ctx) {
            let carId = ctx.params.id.substr(1);
            requester.remove('appdata', `cars/${carId}`, 'kinvey').then(function (res) {
                auth.showInfo('Listing deleted.');
                ctx.redirect('#/allCars');
            })
        })

        //EDIT
        this.get('#/edit/:id', function (ctx) {
            let carId = ctx.params.id.substr(1);
            cars.loadCarDetails(carId)
                .then(function (carInfo) {
                    ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
                    ctx.username = sessionStorage.getItem('username')
                    ctx.title = carInfo.title;
                    ctx.description = carInfo.description
                    ctx.brand = carInfo.brand
                    ctx.model = carInfo.model
                    ctx.year = carInfo.year
                    ctx.imageUrl = carInfo.imageUrl
                    ctx.fuel = carInfo.fuel
                    ctx.price = carInfo.price
                    ctx.isCreator = carInfo._acl.creator === sessionStorage.getItem('userId')
                    ctx._id = carId

                    ctx.loadPartials({
                        header: './templates/common/header.hbs',
                        footer: './templates/common/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/edit/edit.hbs')
                    })
                })
        })
        this.post('#/edit/:id', function (ctx) {
            let carId = ctx.params.id.substr(1);

            let title = escapeHtml(ctx.params.title)
            let description = escapeHtml(ctx.params.description)
            let brand = escapeHtml(ctx.params.brand)
            let model = escapeHtml(ctx.params.model)
            let year = escapeHtml(ctx.params.year)
            let imageUrl = escapeHtml(ctx.params.imageUrl)
            let fuelType = escapeHtml(ctx.params.fuelType)
            let price = escapeHtml(ctx.params.price)
            let seller = sessionStorage.getItem('username')


            if (title.length <= 33
                && description.length >= 30
                && description.length <= 450
                && brand.length <= 11
                && brand.length > 0
                && fuelType.length <= 11
                && fuelType.length > 0
                && model.length <= 11
                && model.length >= 4
                && year.length === 4
                && Number(price) <= 1000000
                && Number(price) > 0
                && imageUrl.substr(0,4) === 'http'
            ){
                cars.editListing(title,description,brand,model,year,imageUrl,fuelType,price,seller,carId).then(function () {

                    auth.showInfo('Listing edited successfully!')
                    ctx.redirect('#/allCars')
                })
            }else {
                console.log('err');
                if (title.length > 33){auth.showError('Title too long!') }
                else if (description.length < 30){auth.showError('Description too short!') }
                else if (description.length > 450){auth.showError('Description too long!') }
                else if (brand.length > 11){auth.showError('Brand name too long!') }
                else if (model.length > 11){auth.showError('Model name too long!') }
                else if (model.length < 4 ){auth.showError('Model name too short!') }
                else if (year.length > 4){auth.showError('Year too long!') }
                else if (year.length < 4){auth.showError('Year too short!') }
                else if ( Number(price) > 1000000){auth.showError('Price too high!') }
                else if ( Number(price) < 0){auth.showError('Price must be non-negative!') }
                else if (price.length === 0){auth.showError('Price must be non-empty!') }
                else if (imageUrl.substr(0,4) !== 'http'){auth.showError('URL must start with http!') }
                else if (imageUrl.length === 0){auth.showError('URL must be non-empty!') }
                else if (title.length === 0){auth.showError('Title must be non-empty!') }
                else if (brand.length === 0){auth.showError('Brand must be non-empty!') }
                else if (fuelType.length > 11){auth.showError('Fuel type too long!') }
                else if (fuelType.length < 0){auth.showError('Fuel type must be non-empty!') }

            }

        })

        //LIST ALL CARS
        this.get('#/allCars', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.empty = false
            cars.loadAllCars().then(function (listings) {
                 let updatedListings = listings
                for (let i = 0; i < updatedListings.length; i++) {
                    if (updatedListings[i].seller === sessionStorage.getItem('username')){
                        updatedListings[i].isCreator = true
                    }
                }
                if (listings.length === 0){
                    ctx.empty = true
                }

                ctx.listings = updatedListings;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    singleListing: './templates/carListings/listing/singleListing.hbs'

                }).then(function () {
                    this.partial('./templates/carListings/allCars.hbs');
                })
            })
        })

        //LIST MY CARS
        this.get('#/myCars',function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.empty = false
            cars.loadMyCars().then(function (listings) {
                if (listings.length === 0){
                    ctx.empty = true
                }
                ctx.listings = listings;
                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    myListing: './templates/carListings/listing/myListing.hbs'

                }).then(function () {
                    this.partial('./templates/carListings/myCars.hbs');
                })
            })
        })

        //CREATE LISTING
        this.get('#/create',function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/create/create.hbs');
            })
        })
        this.post('#/create',function (ctx) {
            let title = escapeHtml(ctx.params.title)
            let description = escapeHtml(ctx.params.description)
            let brand = escapeHtml(ctx.params.brand)
            let model = escapeHtml(ctx.params.model)
            let year = escapeHtml(ctx.params.year)
            let imageUrl = escapeHtml(ctx.params.imageUrl)
            let fuelType = escapeHtml(ctx.params.fuelType)
            let price = escapeHtml(ctx.params.price)
            let seller = sessionStorage.getItem('username')
            
            if (title.length <= 33
                && description.length >= 30
                && description.length <= 450
                && brand.length <= 11
                && brand.length > 0
                && fuelType.length <= 11
                && fuelType.length > 0
                && model.length <= 11
                && model.length >= 4
                && year.length === 4
                && Number(price) <= 1000000
                && Number(price) > 0
                && imageUrl.substr(0,4) === 'http'
            ){
                cars.createListing(title,description,brand,model,year,imageUrl,fuelType,price,seller).then(function () {
                    auth.showInfo('Listing created successfully!')
                    ctx.redirect('#/allCars')
                })
            }else {
                if (title.length > 33){auth.showError('Title too long!') }
                else if (description.length < 30){auth.showError('Description too short!') }
                else if (description.length > 450){auth.showError('Description too long!') }
                else if (brand.length > 11){auth.showError('Brand name too long!') }
                else if (model.length > 11){auth.showError('Model name too long!') }
                else if (model.length < 4 ){auth.showError('Model name too short!') }
                else if (year.length > 4){auth.showError('Year too long!') }
                else if (year.length < 4){auth.showError('Year too short!') }
                else if ( Number(price) > 1000000){auth.showError('Price too high!') }
                else if ( Number(price) < 0){auth.showError('Price must be non-negative!') }
                else if (price.length === 0){auth.showError('Price must be non-empty!') }
                else if (imageUrl.substr(0,4) !== 'http'){auth.showError('URL must start with http!') }
                else if (imageUrl.length === 0){auth.showError('URL must be non-empty!') }
                else if (title.length === 0){auth.showError('Title must be non-empty!') }
                else if (brand.length === 0){auth.showError('Brand must be non-empty!') }
                else if (fuelType.length > 11){auth.showError('Fuel type too long!') }
                else if (fuelType.length < 0){auth.showError('Fuel type must be non-empty!') }

            }


        })


        //HOME
        this.get('index.html', displayHome)
        this.get('#/home', displayHome)

        //LOGIN
        this.get('#/login', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/login/login.hbs');
            })
        })
        this.post('#/login', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password
            let usernameCheck = /^[a-zA-Z]{3,}$/gm
            let passwordCheck = /^[a-zA-Z0-9]{6,}$/gm

            if (username.match(usernameCheck) && password.match(passwordCheck)) {

                auth.login(username, password)
                    .then(function (res) {
                        auth.saveSession(res)
                        auth.showInfo('Login successful.')
                        ctx.redirect('#/allCars')
                    }).catch(auth.handleError)
            }
            else {
                if (!password.match(passwordCheck))
                    if (password.length < 6) {
                        auth.showError('Password too short!')
                    }
                    else auth.showError('Password contains non-english letters!')
                else if (!username.match(usernameCheck)) {
                    if (username.length < 3) {
                        auth.showError('Username too short!')
                    }
                    else auth.showError('Username contains non-english letters!')

                }
            }
        })

        //REGISTER
        this.get('#/register', function (ctx) {
            ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
            ctx.username = sessionStorage.getItem('username');
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                this.partial('./templates/register/register.hbs');
            })
        })
        this.post('#/register', function (ctx) {
            let username = ctx.params.username
            let password = ctx.params.password
            let repeatPassword = ctx.params.repeatPass
            let usernameCheck = /^[a-zA-Z]{3,}$/gm
            let passwordCheck = /^[a-zA-Z0-9]{6,}$/gm

            if (username.match(usernameCheck) && password.match(passwordCheck)
            ) {
                auth.register(username, password)
                    .then(function (res) {
                        auth.saveSession(res)
                        auth.showInfo('User registration successful.')
                        ctx.redirect('#/allCars')
                    }).catch(auth.handleError)
            }
            else {
                if (password !== repeatPassword)
                    auth.showError('Passwords do not match!')
                else if (!password.match(passwordCheck))
                    if (password.length < 6) {
                        auth.showError('Password too short!')
                    }
                    else auth.showError('Password contains non-english letters!')
                else if (!username.match(usernameCheck)) {
                    if (username.length < 3) {
                        auth.showError('Username too short!')
                    }
                    else auth.showError('Username contains non-english letters!')

                }

            }
        })

        //LOGOUT
        this.get('#/logout', function (ctx) {
            auth.logout()
            sessionStorage.clear()
            displayHome(ctx)
            auth.showInfo('Logout successful.')
        })

    });

    function displayHome(ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');

        ctx.loadPartials({

            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/welcome/welcome.hbs')
        })

    }

    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

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


