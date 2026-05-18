const API_BASE = '/api';

export async function createRSVP(data) {
  const response = await fetch(`${API_BASE}/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error al enviar RSVP' }));
    throw new Error(error.error || 'Error al enviar RSVP');
  }

  return response.json();
}
