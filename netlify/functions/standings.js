exports.handler = async function(event) {
  const { code, type, season } = event.queryStringParameters || {};
  if (!code) return { statusCode: 400, body: JSON.stringify({ error: 'Missing code' }) };

  const url = `https://api.football-data.org/v4/competitions/${code}/standings?standingType=${type||'HOME'}&season=${season||2024}`;

  try {
    const res = await fetch(url, {
      headers: { 'X-Auth-Token': '942eec656d6641dba1abd190904a09ef' }
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch(e) {
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
