let cars = (()=>{
    function loadAllCars() {
        return requester.get('appdata', 'cars?query={}&sort={"_kmd.ect": -1}', 'kinvey');
    }

    function loadMyCars() {
        return requester.get('appdata', `cars?query={"seller":"${sessionStorage.getItem('username')}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    function loadCarDetails(carId) {
        return requester.get('appdata', 'cars/' + carId, 'kinvey');
    }

    function editListing(title,description,brand,model,year,imageUrl,fuelType,price,seller,carId) {

        let carData = {
            title:title,
            description:description,
            brand:brand,
            model:model,
            year:year,
            imageUrl:imageUrl,
            fuel:fuelType,
            price:price,
            seller:seller
        };

        return requester.update('appdata', 'cars/' + carId, 'kinvey', carData);
    }
    // ${sessionStorage.getItem('userId')}
    // GET https://baas.kinvey.com/appdata/app_id/cars?query={"seller":"username"}&sort={"_kmd.ect": -1}

    function createListing(title,description,brand,model,year,imageUrl,fuelType,price,seller) {
        let carData = {
            title:title,
            description:description,
            brand:brand,
            model:model,
            year:year,
            imageUrl:imageUrl,
            fuel:fuelType,
            price:price,
            seller:seller
        };

        return requester.post('appdata', 'cars', 'kinvey', carData);
    }


    return {
        loadAllCars,
        createListing,
        loadMyCars,
        loadCarDetails,
        editListing
    }
})()