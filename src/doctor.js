export class DoctorLookUp {
  getDoctors(key, search, location, loc) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=${loc}&user_location=${location.lat}%2C${location.lng}&skip=0&limit=10&user_key=${process.env.exports.apiKey}&${key}=${search}`;
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
  getCats(){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=100`;
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

  getJokes(){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://official-joke-api.appspot.com/jokes/ten`;
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

  getKanye(){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.kanye.rest`;
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
  getLocation(location) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${process.env.exports.OTHER_API_KEY}`;
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
    getNameOrigin(first, last) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `https://v2.namsor.com/NamSorAPIv2/api2/json/origin/${first}/${last}`;
        request.onload = function() {
          if (this.status === 200) {
            resolve(request.response);
          } else {
            reject(Error(request.statusText));
          }
        }
        request.open("GET", url, true);
        request.setRequestHeader("X-API-KEY",process.env.exports.nsKey);
        request.send();
      });
    }
    convertToFullName(code) {
      return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest();
        let url = `https://restcountries.eu/rest/v2/alpha/${code}`;
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
