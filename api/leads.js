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
    const arloResponse = await fetch(
      'https://arthur-arlo.fly.dev/api/leads',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          project_type,
          budget,
          timeline
        })
      }
    );

    const arloData = await arloResponse.json();
    console.log('Arlo lead response:', arloData);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Arlo error:', error);
    return res.status(200).json({ success: true });
  }
}
