import { DoctorLookUp} from './doctor';
import $ from 'jquery';


$("#query").on("submit", function(event){
  let ailment = $(".ailment").text();
   let promise = doctor.getConditions(ailment);

   promise.then(function(response) {
     let body = JSON.parse(response);
     console.log(body);
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
