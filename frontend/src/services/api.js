const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // Campaign endpoints
  getCampaigns: async () => {
    const response = await fetch(`${API_BASE_URL}/campaigns`);
    return response.json();
  },

  createCampaign: async (campaignData) => {
    const response = await fetch(`${API_BASE_URL}/campaigns`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(campaignData),
    });
    return response.json();
  },

  // Analytics endpoints
  getAnalytics: async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/analytics?${queryString}`);
    return response.json();
  },

  // Publisher endpoints
  getPublisherStats: async (publisherId) => {
    const response = await fetch(`${API_BASE_URL}/publishers/${publisherId}/stats`);
    return response.json();
  },
};
