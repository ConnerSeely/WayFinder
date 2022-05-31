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
        <div class="col d-flex justify-content-center">
          <h1>${this.name}</h1>
        </div>
        <div>${this.Reservations}</div>

          <form class="item-form" onsubmit="app.reservationsController.addReservation('${this.id}')">
            <select name="type" id="type">
              <option value="plane">✈️ plane</option>
              <option value="hotel">🏨 hotel</option>
              <option value="car"> 🚗 car</option>
            </select>
            <input type="text" name="name" required id="name" placeholder="name">
            <input type="text" name="confirmNumber" required id="confirmNumber" placeholder="confirmation #">
            <input type="text" name="address" required id="address" placeholder="address">
            <input type="date" name="date" required id="date" placeholder="date">
            <input type="number" name="cost" required id="cost" placeholder="cost">
            <button class="btn btn-primary" title="add reservation"> + </button>
          </form>
          <textarea onblur="app.tripsController.updateTrip('${this.id}')" class="border-0">${this.notes}</textarea>
          <button type="button" class="btn btn-danger" onclick="app.tripsController.deleteTrip('${this.id}')">Delete Trip</button>  
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Create Trip
            </button>
          <h4 class="text-end">Total :${this.Total} </h4>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form class="trip-form">
                <input type="text" name="name" id="name" placeholder="name">
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="app.tripsController.createTrip()" data-bs-dismiss="modal">Create Trip</button>
            </div>
          </div>
        </div>
      </div>
          `

    }

    get Reservations() {
        let reservations = ProxyState.reservations.sort((a, b) => a.date - b.date)
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
