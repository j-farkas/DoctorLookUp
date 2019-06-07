export class DoctorLookUp {
    constructor(){
      this.conditions = {};
    }
  getConditions(ailment) {
    return new Promise(function(resolve, reject) {

      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=or-portland&user_location=45.520%2C-122.677&skip=0&limit=10&user_key=${process.env.exports.apiKey}&query=${ailment}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
