export const API_BASE = '/api';

export const apiRequest = path => fetch(`${API_BASE}/${path}`);
