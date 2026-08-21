const API_URL = 'http://localhost/mobileria-api/api';

export const api = {
  getProducts: async (category = '') => {
    try {
      const url = category ? `${API_URL}/get_products.php?category=${category}` : `${API_URL}/get_products.php`;
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  },
  
  getProjects: async () => {
    try {
      const res = await fetch(`${API_URL}/get_projects.php`);
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
};