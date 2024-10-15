import axios from 'axios';
import fetch from "node-fetch";

export const getToken = async (clientID: string, clientSecret: string) => {
  const auth = Buffer.from(`${clientID}:${clientSecret}`).toString('base64');
  const data = await fetch('https://api.orange.com/oauth/v3/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
    body: 'grant_type=client_credentials'
  }).then(response => response.json())

  return data['access_token'];
}

export const sendSMS = async (senderAdress: string, address: string, message: string, token: string) => {
  const data = await fetch(`https://api.orange.com/smsmessaging/v1/outbound/tel:+${senderAdress}/requests`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "outboundSMSMessageRequest": {
        "address": `tel:+225${address}`,
        "senderAddress": `tel:+${senderAdress}`,
        "outboundSMSTextMessage": {
          "message": message
        }
      }
    })
  })
    .then(response => response.json());

  return data;
}