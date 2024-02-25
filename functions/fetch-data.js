// functions/fetch-data.js
import axios from 'axios';

export async function handler(event, context) {
  const apiKey = process.env.LOSTARK_API_KEY;
  const characterName = event.queryStringParameters.name;
  if (!characterName) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "캐릭터 이름이 필요합니다." })
    };
  }

  const url = `https://developer-lostark.game.onstove.com/armories/characters/${encodeURIComponent(characterName)}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ msg: error.message }) };
  }
};
