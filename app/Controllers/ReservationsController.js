import { ProxyState } from "../AppState.js";
import { reservationsService } from "../Services/ReservationsService.js";
import { Pop } from "../Utils/Pop.js";

export class ReservationsController {
    constructor() {
        console.log('reservations loaded', ProxyState.reservations);
    }


    addReservation(tripId) {
        window.event.preventDefault()
        console.log('adding reservation to trip', tripId);
        let form = window.event.target
        let reservationData = {
            tripId: tripId,
            type: form.type.value,
            name: form.name.value,
            confirmNumber: form.confirmNumber.value,
            address: form.address.value,
            date: form.date.value,
            cost: form.cost.value
        }
        console.log(reservationData);
        reservationsService.addReservation(reservationData)
    }

    async deleteReservation(id) {
        if (await Pop.confirm('are you sure you want to delete this?')) {
            reservationsService.deleteReservation(id)
        }
    }
}