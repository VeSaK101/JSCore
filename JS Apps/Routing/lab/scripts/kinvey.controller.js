const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_SJ0Bj9dS7'
const APP_SECRET = '77890534d9aa402eaf55c80d949b13b2'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}

const kinveyController = (function () {
    function registerUser(username, password, firstName, lastName,
                          phone, email) {
        $.ajax({
            method: "POST",
            url: BASE_URL + 'user/' + APP_KEY + '/',
            headers: AUTH_HEADERS,
            data: {username, password, firstName, lastName, phone, email}
        }).then(function (res) {
            console.log(res);
        }).catch(handleError)
    }






    function handleError(err) {
        console.log(err)
    }

    return {registerUser}
}())