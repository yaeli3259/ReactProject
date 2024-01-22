
import axios from 'axios';
import { makeAutoObservable, runInAction, action, observable } from 'mobx';

class ServiceData {
    services = [];
    constructor() {
        makeAutoObservable(this, {
            services: observable,
            fetchServicesFromServer: action,
            addServiceToServer: action,
        });
        // Call the initializeData method to fetch services and add default if necessary
        this.initializeData();
    }

    async initializeData() {
        try {
            // Await the result of fetchServicesFromServer before proceeding
            await this.fetchServicesFromServer();

            // If the fetched services array is empty, add default services
            if (this.services.length === 0) {
                const defaultServices =
                    [{
                        id: '1',
                        name: "song record",
                        description: "one hour of song record",
                        price: 200,
                        duration: 60,
                    }, {
                        id: '2',
                        name: "read record",
                        description: "one hour of song record",
                        price: 200,
                        duration: 60,
                    }, {
                        id: '3',
                        name: "play record",
                        description: "one hour of song record",
                        price: 200,
                        duration: 60,
                    }, {
                        id: '4',
                        name: "sound course",
                        description: "one hour of song record",
                        price: 200,
                        duration: 60,
                    },
                    {
                        id: '5',
                        name: "plaing course",
                        description: "one hour ofsong record",
                        price: 200,
                        duration: 60,
                    }
                    ];
                // Add more default services as needed


                // Add default services to the array
                defaultServices.forEach((service) => this.addServiceToServer(service));
            }
        } catch (error) {
            console.error("שגיאה באתחול המידע:", error);
        }
    }

    // Updated fetchServicesFromServer to be an async function
    async fetchServicesFromServer() {
        try {
            const response = await axios.get("http://localhost:8787/services");
            const data = response.data;
            // Use runInAction to safely update the MobX state
            runInAction(() => {
                this.services = data;
            });
            // console.log("שירותים נטענו בהצלחה:", data);
            return this.services;
        } catch (error) {
            console.error("שגיאה בטעינת השירותים:", error);
            throw error;
        }
    }

    // Changed the method name to be consistent
    async addServiceToServer(newData) {
        try {
            const response = await fetch("http://localhost:8787/service", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });
            const serviceAdded = await response.status;
            // Use runInAction to safely update the MobX state
            runInAction(() => {
                if (serviceAdded === 200)
                    this.services.push(newData);
            });
            return this.services;
        } catch (error) {
            console.error("שגיאה בעדכון פרטי השירות:", error);
            throw error;
        }
    }
}

export default new ServiceData();