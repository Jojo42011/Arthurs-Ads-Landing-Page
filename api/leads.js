export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, address,
          project_type, budget, timeline } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone required' });
  }

  try {
    const vapiResponse = await fetch('https://api.vapi.ai/call/phone', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VAPI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        assistantId: process.env.VAPI_SALES_AGENT_ID,
        phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
        customer: {
          number: phone,
          name: name
        },
        assistantOverrides: {
          variableValues: {
            name,
            project_type,
            budget,
            address
          }
        }
      })
    });

    const vapiData = await vapiResponse.json();
    console.log('Vapi response:', vapiData);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Vapi error:', error);
    return res.status(200).json({ success: true });
  }
}
