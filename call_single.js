// call_single.js
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const to = process.env.CALL_TO;
const from = process.env.CALL_FROM;
const twimlUrl = process.env.TWIML_URL; // your TwiML Bin URL

if (!accountSid || !authToken || !to || !from || !twimlUrl) {
  console.error('Missing required env vars. Make sure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, CALL_TO, CALL_FROM, and TWIML_URL are set.');
  process.exit(1);
}

const client = twilio(accountSid, authToken);

async function makeCall() {
  try {
    const call = await client.calls.create({
      url: twimlUrl,
      to: to,
      from: from,
    });
    console.log(`Call initiated: ${call.sid}`);
  } catch (err) {
    console.error('Error initiating call:', err);
    process.exit(1);
  }
}

makeCall();
