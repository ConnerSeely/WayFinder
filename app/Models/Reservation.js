import { generateId } from "../Utils/generateId.js";


export class Reservation {
  constructor(data) {
    this.id = data.id || generateId()
    this.reservationId = data.reservationId
    this.type = data.type
    this.name = data.name
    this.confirmNumber = data.confirmNumber
    this.address = data.address
    this.date = new Date(data.date)
    this.cost = data.cost
  }

  get Template() {
    return `
        <div class="row p-3">
            <div class="col-1">
              <p>${this.type}</p>
            </div>
            <div class="col-3">
              <p>${this.name}</p>
            </div>
            <div class="col-3">
              <p>${this.confirmNumber}</p>
            </div>
            <div class="col-3">
              <p>${this.address}</p>
            </div>
            <div class="col-1">
              <p>${this.date}</p>
            </div>
            <div class="col-1">
              <p>${this.cost}</p>
            </div>
    `
  }
}