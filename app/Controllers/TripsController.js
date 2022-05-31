import { ProxyState } from "../AppState.js";
import { tripsService } from "../Services/TripsService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js";


function _drawTrips() {
    let trips = ProxyState.trips
    let template = ''
    trips.forEach(t => template += t.Template)
    document.getElementById('trips').innerHTML = template
}

export class TripsController {
    constructor() {
        console.log('Trips Controller Loaded', ProxyState.trips);
        ProxyState.on('trips', _drawTrips)
        ProxyState.on('reservations', _drawTrips)
        ProxyState.on('trips', saveState)
        ProxyState.on('reservations', saveState)
        loadState()
        _drawTrips()
    }

    // TODO add create trip function
    createTrip() {
        window.event.preventDefault()
        console.log('creating a trip');
        let form = window.event.target
        let tripData = {
            name: form.name.value,
        }
        console.log('tripData', tripData);
        tripsService.createTrip(tripData)
    }

    updateTrip(id) {
        let textarea = window.event.target
        console.log(textarea.value, id);
        tripsService.updateTrip(textarea.value, id)
    }

    async deleteTrip(id) {
        if (await Pop.confirm('are you sure you want to delete this?')) {
            tripsService.deleteTrip(id)
        }
    }
}