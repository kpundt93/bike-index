import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from "./js/bike-service";

function displayBikes(response) {
  if (response.bikes) {
    $(".show-location").text(`Stolen location: ${response.bikes[0].stolen_location}`);
    $(".show-colors").text(`Colors: ${response.bikes[0].frame_colors}`);
    $(".show-description").text(`Description: ${response.bikes[0].description}`);
    $(".show-brand").text(`Brand: ${response.bikes[0].manufacturer_name}`);
    $(".show-serial-num").text(`Serial number: ${response.bikes[0].serial}`);
  } else {
    $(".show-errors").text(`There was an error processing your request: ${response}`);
  }
}

async function makeApiCall(location) {
  const response = await BikeService.getBikes(location);
  displayBikes(response);
}

$(document).ready(function() {
  $('#bike-location').click(function() {
    let location = $('#location').val();
    // clearFields();
    makeApiCall(location);
  });
});