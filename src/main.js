import { DoctorLookUp} from './doctor';
import $ from 'jquery';


$("form").on("submit", function(event){
console.log($("."+$(this).attr(`id`)+".search").val());
   let promise = doctor.getDoctors($(this).attr(`id`),$("."+$(this).attr(`id`)+".search").val());
   promise.then(function(response) {
     let body = JSON.parse(response);
     console.log(body);
     $("#doctors").empty();
     if(body.data.length === 0){
       $("#doctors").append(`<li>No Results Found</li>`)
     }
     body.data.forEach(function(doc){
       $("#doctors").append(`<li>${doc.profile.first_name} ${doc.profile.last_name}<ul class = ${doc.uid}></ul></li>`)
       doc.practices.forEach(function(prac){
         let newPatients = "No";
         if(prac.accepts_new_patients === true){
            newPatients = "Yes";
         }
         let website = "None";
         if(prac.website != undefined){
           website = prac.website;
         }
         $(`.${doc.uid}`).append(`${prac.phones[0].number.substr(0,3)}-${prac.phones[0].number.substr(3,3)}-${prac.phones[0].number.substr(6,4)} ${prac.visit_address.street} Accepts new Patients: ${newPatients} Website: ${website} <br></li>`)
       })
     })
   }, function(error) {
     $('#doctors').append(`<li>There was an error processing your request: ${error.message}</li>`);
   });
   event.preventDefault();
});
let doctor = new DoctorLookUp();
