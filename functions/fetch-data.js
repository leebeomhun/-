// netlify/functions/fetch-data.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const API_ENDPOINT = 'https://developer-lostark.game.onstove.com';
  const lostark_API_KEY = process.env.lostark_API_KEY; // 환경변수에서 API 키 가져오기

  try {
    const response = await fetch(API_ENDPOINT, {
      headers: {
        "Authorization": `Bearer ${lostark_API_KEY}`
      }
    });
    if (!response.ok) {
      // 요청 실패 처리
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
  }
};
