import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from "./js/bike-service";

function displayBikes(response) {
  if (response.bikes) {
    let output = buildBikeString(response);
    $('.show-bikes').html(output);
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
    makeApiCall(location);
  });
});

function buildBikeString(response) {
  let htmlToDisplay = [];
  for (let i=0; i < response.bikes.length; i++) {
    console.log(response.bikes[i].stolen_location);
    if (response.bikes[i].large_img !== null) {
      htmlToDisplay.push(`<img src=${response.bikes[i].large_img} class='bike-img'>`);
    } else {
      htmlToDisplay.push(`<img src="./src/assets/images/stock-bike.jpg" class='bike-img'>`);
    }
    htmlToDisplay.push(`<p>Stolen location: ${response.bikes[i].stolen_location}</p>`);
    htmlToDisplay.push(`<p>Colors: ${response.bikes[i].frame_colors}</p>`);
    htmlToDisplay.push(`<p>Description: ${response.bikes[i].description}</p>`);
    htmlToDisplay.push(`<p>Brand: ${response.bikes[i].manufacturer_name}</p>`);
    htmlToDisplay.push(`<p>Serial number: ${response.bikes[i].serial}</p>`);
    htmlToDisplay.push('<hr>');
  }
  console.log(htmlToDisplay);
  return htmlToDisplay.join('');
}