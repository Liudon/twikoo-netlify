// exports.handler = require('twikoo-netlify').handler
const { handler } = require('twikoo-netlify')

const ALLOWED_ORIGINS = new Set([
  'https://liudon.com',
  'https://blog.liudon.xyz',
  'https://liudon.xyz'
])

function corsHeaders(origin) {
  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return {}
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers':
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  }
}

exports.handler = async function (event, context) {
  const origin =
    event.headers?.origin ||
    event.headers?.Origin ||
    ''

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: ''
    }
  }

  const result = await handler(event, context)

  return {
    ...result,
    headers: {
      ...(result.headers || {}),
      ...corsHeaders(origin)
    }
  }
}
