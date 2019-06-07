import { DoctorLookUp} from './doctor';
import $ from 'jquery';


$("form").on("submit", function(event){
console.log($("."+$(this).attr(`id`)+".search").val());
   let promise = doctor.getConditions($(this).attr(`id`),$("."+$(this).attr(`id`)+".search").val());

   promise.then(function(response) {
     let body = JSON.parse(response);
     console.log(body);
     $("#doctors").empty();
     body.data.forEach(function(doc){

       $("#doctors").append(`<li>${doc.profile.first_name} ${doc.profile.last_name} ${doc.practices[0].phones[0].number.substr(0,3)}-${doc.practices[0].phones[0].number.substr(3,3)}-${doc.practices[0].phones[0].number.substr(6,4)}</li>`)
     })
     //doctor.conditions = body;
//        $("#Ailment").append(`<option value = "${body.data.uid}">${body.data.name}</option>`);
   }, function(error) {
     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
   });
   event.preventDefault();
});
let doctor = new DoctorLookUp();
$(document).ready(function() {
  // $('#weatherLocation').click(function() {
  //     let city = $('#location').val();
  //     $('#location').val("");

  });
