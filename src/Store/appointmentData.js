import axios from 'axios';
import { makeAutoObservable, action, observable, computed } from 'mobx';
class AppointmentData {
  appointments = [{
    serviceName: "record",
    serviceDescription: "one hour of fun",
    servicePrice: 200,
    dateTime: "2024-01-01T10:00:00.000Z",
    clientName: "אבי כהן",
    clientPhone: "050-1234567",
    clientEmail: "m@m.com",
  },
  {
    serviceName: "record",
    serviceDescription: "one hour of fun",
    servicePrice: 200,
    dateTime: "2021-07-20T10:00:00.000Z",
    clientName: "אביבי כהן",
    clientPhone: "058-3238061",
    clientEmail: "n@m.com",
  },
  {
    serviceName: "record",
    serviceDescription: "one hour of fun",
    servicePrice: 200,
    dateTime: "2021-10-20T10:00:00.000Z",
    clientName: "אביבי כהן",
    clientPhone: "058-3238061",
    clientEmail: "n@m.com",
  }];
  constructor() {
    makeAutoObservable(this, {
      appointments: observable,
      getAppointmentsFromServer: computed,
      addAppointmentToServer: action,
    });
    if (this.getAppointmentsFromServer == undefined)
      for (let i = 0; i < this.appointments.length; i++) {
        this.addAppointmentToServer(this.appointments[i]);
      }
  }
  get getAppointmentsFromServer() {
    axios.get("http://localhost:8787/appointments").then(res => {
      this.appointments = res.data;
    }).catch(error => {
      console.log(error);
    });
  }
  async addAppointmentToServer(meet) {
    const response = await fetch("http://localhost:8787/appointment", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(meet),
    }).catch(error => {
      console.error('Error:', error);
    });
    if (!response.ok) {
      console.error(`Error: ${response.status}`);
      return false;
    }
    return true;
  }
}
export default new AppointmentData;
