$(() => {


    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.get('#/login', function() {
            this.partial('./templates/login.hbs');
        });


        this.get('#/register', function() {
            this.partial('./templates/register.hbs');
        });

        this.post('#/register', function(context) {
            kinveyController.registerUser(
                context.params.username,
                context.params.password,
                context.params.firstName,
                context.params.lastName,
                context.params.phone,
                context.params.email)
        });

        this.get('#/contacts/:userId', function() {
            this.partial('./templates/contacts.hbs');
        });

        this.get('#/profile', function() {
            this.partial('./templates/profile.hbs');
        });
    });
    app.run()
});