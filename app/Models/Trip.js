import { ProxyState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class Trip {
    constructor(tripData) {
        this.id = tripData.id || generateId()
        this.name = tripData.name
        this.notes = tripData.notes
    }

    get Template() {
        return `    
      
    ${this.Reservations}

          <form class="item-form" onsubmit="app.reservationsController.addReservation('${this.id}')">
            <select name="type" id="type">
              <option value="plane">✈️ plane</option>
              <option value="hotel">🏨 hotel</option>
              <option value="car"> 🚗 car</option>
            </select>
            <input type="text" name="name" id="name" placeholder="name">
            <input type="text" name="confirmNumber" id="confirmNumber" placeholder="confirmation #">
            <input type="text" name="address" id="address" placeholder="address">
            <input type="text" name="date" id="date" placeholder="date">
            <input type="number" name="cost" id="cost" placeholder="cost">
            <button class="btn btn-primary" title="add reservation"> + </button>
          </form>
          <textarea onblur="app.tripsController.updateTrip('')" class="border-0">Notes</textarea>
          <h4 class="text-end">Total : </h4>`
    }

    get Reservations() {
        let reservations = ProxyState.reservations.filter(r => r.tripId == this.id)
        let template = ''
        reservations.forEach(r => template += r.Template)
        return template
    }

    get Total() {
        let reservations = ProxyState.reservations.filter(r => r.tripId == this.id)
        let subTotal = 0
        reservations.forEach(r => subTotal += parseInt(r.cost))
        return subTotal
    }

}
