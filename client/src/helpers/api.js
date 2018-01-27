export const API_BASE = 'http://localhost:3001';

export const apiRequest = path => fetch(`${API_BASE}/${path}`, { credentials: 'include' });
