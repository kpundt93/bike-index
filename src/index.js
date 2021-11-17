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
  let manufactorers = [];
  for (let i=0; i < response.bikes.length; i++) {
    if (response.bikes[i].large_img !== null) {
      htmlToDisplay.push(`<img src= ${response.bikes[i].large_img}  class='bike-img'>`);
    } else {
      htmlToDisplay.push(`<img src= ${bike} class="bike-img">`);
    }
    htmlToDisplay.push(`<p>Stolen location: ${response.bikes[i].stolen_location}</p>`);
    htmlToDisplay.push(`<p>Colors: ${response.bikes[i].frame_colors}</p>`);
    if (response.bikes[i].description !== null && response.bikes[i].description !== "") {
      htmlToDisplay.push(`<p>Description: ${response.bikes[i].description}</p>`);
    }
    htmlToDisplay.push(`<p>Brand: ${response.bikes[i].manufacturer_name}</p>`);
    htmlToDisplay.push(`<p>Serial number: ${response.bikes[i].serial}</p>`);
    htmlToDisplay.push('<hr>');
    manufactorers.push(response.bikes[i].manufacturer_name);
  }
  manufactorers.sort();
  let map = {};
  let max = manufactorers[0];
  let maxCount = 1;
  for (let i = 0; i < manufactorers.length; i++) {
    let temp = manufactorers[i];
    if(map[temp] === undefined) {
      map[temp] = 1;
    }
    else {
      map[temp] += 1;
    }
    if (map[temp] > maxCount) {
      max = temp;
      maxCount = map[temp];
    }
  }
  htmlToDisplay.unshift(`<p>The most commonly stolen from manufacturer is ${max} with ${maxCount} stolen bikes.</p><hr>`);
  return htmlToDisplay.join('');
}