import axios from 'axios';
import { makeAutoObservable, observable, runInAction, action } from 'mobx';


class BusinessData {
  businessDetails = {};

  constructor() {
    makeAutoObservable(this, {
      businessDetails: observable,
      fetchDetailsFromServer: action,
      updateDetailsOnServer: action,
    });
    this.initializeData();
  }

  // הפעולה הזו בודקת האם יש כבר נתונים ב- businessDetails, אם לא - היא מוסיפה נתונים קבועים כברירת מחדל
  async initializeData() {
    try {
      await this.fetchDetailsFromServer();
      if (!this.businessDetails || Object.keys(this.businessDetails).length === 0) {
        const defaultDetails = {
          name: "Sound Studio",
          address: "RothChild 60 Tel Aviv",
          phone: "03-123456",
          owner: "Yael Barda",
          logo: "/images/אולפן-הקטלות-1208x800.jpg",
          description: "the best studio for any records!",
        };
        await this.updateDetailsOnServer(defaultDetails);
      }
    } catch (error) {
      console.error("error: ", error);
    }
  }

  // הפעולה הזו מביאה את הנתונים מהשרת ומעדכנת את המשתנה businessDetails
  async fetchDetailsFromServer() {
    try {
      const response = await axios.get("http://localhost:8787/businessData");
      const data = response.data;
      runInAction(() => {
        this.businessDetails = data;
      });
      return this.businessDetails;
    } catch (error) {
      console.error("error: ", error);
      throw error;
    }
  }

  // הפעולה הזו מעדכנת את הנתונים בשרת וגם במשתנה businessDetails
  async updateDetailsOnServer(newData) {
    try {
      const response = await fetch("http://localhost:8787/businessData", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const detailsAdded = await response.status;
      runInAction(() => {
        if (detailsAdded === 200) {
          this.businessDetails = newData;
        }
      });
      return this.businessDetails;
    } catch (error) {
      console.error("error update: ", error);
      throw error;
    }
  }
}

export default new BusinessData();


