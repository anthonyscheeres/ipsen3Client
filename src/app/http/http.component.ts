import { Component, OnInit } from '@angular/core';



/**
*
* @author Anthony Scheeres
*
*/
export function sendHttpRequest(url: string, data: string) {
  return waitForResponse(url, data)
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
    method: 'POST',
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






