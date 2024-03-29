import { DoctorLookUp } from './doctor';
import $ from 'jquery';
import 'bootstrap';
import './styles.css';

let doctor = new DoctorLookUp();

$("form").on("submit", function(event){
  let loc = $("#location").val();
  let key = $(this).attr(`id`);
  let search = $("."+$(this).attr(`id`)+".search").val();
  let locationPromise = doctor.getLocation($("#location option:selected").text());
  locationPromise.then(function(response){
    let body = JSON.parse(response);
    let promise = doctor.getDoctors(key,search,body.results[0].geometry, loc);
    promise.then(function(response) {
      let body = JSON.parse(response);
      $("#doctors").empty();
      if(body.data.length === 0){
        $("#doctors").append(`<li>No Results Found</li>`)
      }
      body.data.forEach(function(doc){
        $("#doctors").append(`<hr><li><span class='docname'>${doc.profile.first_name} ${doc.profile.last_name}</span><br><p>Practices:</p><ul class = ${doc.uid}></ul></li>`)
        doc.practices.forEach(function(prac){
          let newPatients = "No";
          if(prac.accepts_new_patients === true){
            newPatients = "Yes";
          }
          let website = "n/a";
          if(prac.website != undefined){
            website = prac.website;
          }
          $(`.${doc.uid}`).append(`Phone Number: (${prac.phones[0].number.substr(0,3)})-${prac.phones[0].number.substr(3,3)}-${prac.phones[0].number.substr(6,4)} | Address: ${prac.visit_address.street} | Accepting new Patients: ${newPatients} | Website: ${website} <br></li>`)
        })
        let catFacts = doctor.getCats();
        let facts = "";
        catFacts.then(function(response){
          facts = JSON.parse(response);
          $(`.${doc.uid}`).append("<hr>Important information about the doctor:<br><br>Doctor's favorite cat trivia: " + facts[Math.floor(Math.random() * 100)].text)
          let joke = doctor.getJokes();
          joke.then(function(response){
            let jokes = JSON.parse(response);
            let rand = Math.floor(Math.random() * 10);
            $(`.${doc.uid}`).append("<br>Doctor's favorite joke: " + jokes[rand].setup);
            $(`.${doc.uid}`).append("<br>" + jokes[rand].punchline);
            let kanye = doctor.getKanye();
            kanye.then(function(response){
              let kanyeQ = JSON.parse(response);
              $(`.${doc.uid}`).append("<br>Some wise words from the doctor: " + kanyeQ.quote);
              let origin = doctor.getNameOrigin(doc.profile.first_name, doc.profile.last_name);
              origin.then(function(response){
                let nameO = JSON.parse(response);
                let origin2 = doctor.convertToFullName(nameO.countryOrigin);
                origin2.then(function(response){
                  let nameO2 = JSON.parse(response);
                  $(`.${doc.uid}`).append(`<br>The name ${doc.profile.first_name} ${doc.profile.last_name} likely originated from: ${nameO2.name}`);
                })
              })
            })
          })
        })
      })
    }, function(error) {
      $('#doctors').append(`<li>There was an error processing your request: ${error.message}</li>`);
    });
  })
  event.preventDefault();
});
