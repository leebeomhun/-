// functions/fetch-data.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // 환경변수에서 API 키 가져오기
  const apiKey = process.env.LOSTARK_API_KEY;

  // 쿼리스트링에서 캐릭터 이름 가져오기
  const characterName = event.queryStringParameters.name;
  if (!characterName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "캐릭터 이름이 필요합니다." })
    };
  }

  const url = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`; // URL에 캐릭터 이름 포함

  try {
    const response = await fetch(url, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${apiKey}` // API 키 사용
      }
    });

    if (!response.ok) {
      // 요청 실패 처리
      return { statusCode: response.status, body: response.statusText };
    }

    const data = await response.json();

    // 성공적으로 데이터를 받아왔을 때
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    // 에러 처리
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
  }
};
