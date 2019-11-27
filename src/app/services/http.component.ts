import { Component, OnInit } from '@angular/core';
import { ProtocolR } from '../models/Protocol';



/**
*
* @author Anthony Scheeres
*
*/
export function sendHttpPostRequest(url: string, data: string) {
  return waitForResponse(url, data)
}



/**
*
* @author Anthony Scheeres
*
*/
export function sendHttpGetRequest(url: string) {
  return waitForResponseGet(url)
}


/**
*
* @author Anthony Scheeres
*
*/
async function waitForResponseGet(url: string) {
  var response = await fetchJsonGet(url)
  return response
}



/**
*
* @author Anthony Scheeres
*
*/
async function fetchJsonGet(url) {
  var content: string = null;
  const rawResponse = await fetch(url, {
    method: ProtocolR.GET,
  });
  content = await rawResponse.text();
  console.log(content)
  return content;
}

/**
*
* @author Anthony Scheeres
*
*/
async function waitForResponse(url : string, data : string){
  var response = await fetchJson(url, data);
  return response
}



/**
*
* @author Anthony Scheeres
*
*/
async function fetchJson(url : string, data: string) {
  var content: string = null;
  const rawResponse = await fetch(url, {
    method: ProtocolR.POST,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data
  });
  content = await rawResponse.text();
  console.log(content)
  return content;
}






