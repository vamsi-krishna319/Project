const API = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export async function login(email, password) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  });
  return res.json();
}

export async function fetchShifts(token, params = '') {
  const res = await fetch(`${API}/shifts${params}`, {
    headers: {'Authorization': `Bearer ${token}`}
  });
  return res.json();
}

export async function createShift(token, payload) {
  const res = await fetch(`${API}/shifts`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function fetchEmployees(token) {
  const res = await fetch(`${API}/employees`, {
    headers: {'Authorization': `Bearer ${token}`}
  });
  return res.json();
}
