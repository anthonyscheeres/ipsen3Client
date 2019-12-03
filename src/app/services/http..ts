import { Component, OnInit } from '@angular/core';
import { ProtocolR } from '../models/Protocol';







/**
*
* @author Anthony Scheeres
*
*/
export async function fetchJsonGet(url) {
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
export async function fetchJsonPost(url : string, data: string) {
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






