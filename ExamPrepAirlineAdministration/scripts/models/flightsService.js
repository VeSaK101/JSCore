let flightsService = (() => {
    function loadFlights() {
        // Request teams from db
        return requester.get('appdata', 'flights?query={"isPublic":"on"}', 'kinvey');
    }
    function loadMyFlights() {
        // Request teams from db
        return requester.get('appdata', `flights?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`, 'kinvey');
    }

    function loadFlightDetails(flightId) {
        return requester.get('appdata', 'flights/' + flightId, 'kinvey');
    }

    function createFlight(destination, origin, departureDate, departureTime, seats, cost, img, isPublic) {
        let flightData = {
            destination: destination,
            origin: origin,
            departureDate: departureDate,
            departureTime: departureTime,
            seats: seats,
            cost: cost,
            img: img,
            isPublic: isPublic
        };

        return requester.post('appdata', 'flights', 'kinvey', flightData);
    }

    function edit(flightId, destination, origin, departureDate, departureTime, seats, cost, img, isPublic) {

        let flightData = {
            destination: destination,
            origin: origin,
            departureDate: departureDate,
            departureTime: departureTime,
            seats: seats,
            cost: cost,
            img: img,
            isPublic: isPublic
        };

        return requester.update('appdata', 'flights/' + flightId, 'kinvey', flightData);
    }
    //
    //
    //
    // function joinTeam(teamId) {
    //     let userData = {
    //         username: sessionStorage.getItem('username'),
    //         teamId: teamId
    //     };
    //
    //     return requester.update('user', sessionStorage.getItem('userId'), 'kinvey', userData);
    // }
    //
    // function leaveTeam() {
    //     let userData = {
    //         username: sessionStorage.getItem('username'),
    //         teamId: ''
    //     };
    //
    //    return requester.update('user', sessionStorage.getItem('userId'), userData, 'kinvey');
    // }


    return {
        loadFlights,
        loadMyFlights,
        loadFlightDetails,
        edit,
        createFlight,
        // joinTeam,
        // leaveTeam
    }
})()