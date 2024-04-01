const RELAYER_URL = process.env.NEXT_PUBLIC_RELAYER_ADDRESS ?? "";

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { key } = req.body;
        const response = await fetch(`${RELAYER_URL}/addkey`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: key,
        }),
      });
      const result = await response.json();
        res.status(200).json({ ...result });
      } catch (error) {
        res.status(500).json({ success: false, error: 'Internal server error' });
      }
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
}