import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from "./js/bike-service";

import bike from './assets/images/stock-bike.jpg';

function displayBikes(response) {
  if (response.bikes) {
    let output = buildBikeString(response);
    $('.show-bikes').html(output);
  } else {
    $(".show-errors").text(`There was an error processing your request: ${response}`);
  }
}

async function makeApiCall(location, color) {
  const response = await BikeService.getBikes(location, color);
  displayBikes(response);
}

$(document).ready(function() {
  $('#bike-location').click(function() {
    let location = $('#location').val();
    let color = $('#color').val();
    makeApiCall(location, color);
  });
});

function buildBikeString(response) {
  let htmlToDisplay = [];
  for (let i=0; i < response.bikes.length; i++) {
    if (response.bikes[i].large_img !== null) {
      htmlToDisplay.push(`<img src= ${response.bikes[i].large_img}  class='bike-img'>`);
    } else {
      htmlToDisplay.push(`<img src= ${bike} class="bike-img">`);
    }
    htmlToDisplay.push(`<p>Stolen location: ${response.bikes[i].stolen_location}</p>`);
    htmlToDisplay.push(`<p>Colors: ${response.bikes[i].frame_colors}</p>`);
    htmlToDisplay.push(`<p>Description: ${response.bikes[i].description}</p>`);
    htmlToDisplay.push(`<p>Brand: ${response.bikes[i].manufacturer_name}</p>`);
    htmlToDisplay.push(`<p>Serial number: ${response.bikes[i].serial}</p>`);
    htmlToDisplay.push('<hr>');
  }
  return htmlToDisplay.join('');
}