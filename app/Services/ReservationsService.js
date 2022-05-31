import { ProxyState } from "../AppState.js";
import { Reservation } from "../Models/Reservation.js";



class ReservationsService {
    addReservation(reservationData) {
        console.log('add reservation service', reservationData);
        ProxyState.reservations = [...ProxyState.reservations, new Reservation(reservationData)]
    }

    deleteReservation(id) {
        console.log('deleting reservation', id);
        ProxyState.reservations = ProxyState.reservations.filter(it => it.id != id)
    }
}

export const reservationsService = new ReservationsService()
