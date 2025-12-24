(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/auth/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Curl Test', email: 'curltest@example.com', password: 'password123' }),
    });
    const text = await res.text();
    console.log('STATUS', res.status);
    console.log('HEADERS', Object.fromEntries(res.headers.entries()));
    console.log('BODY', text);
  } catch (err) {
    console.error('Request error:', err);
  }
})();
