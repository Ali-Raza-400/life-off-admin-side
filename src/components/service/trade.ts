import axios from 'axios';

const API_BASE_URL = 'https://api.tradedoubler.com/1.0';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_TRADEDOUBLER_ACCESS_TOKEN}`
  }
});

// Add response interceptor to handle common errors
api.interceptors.response.use(
  response => {
    // Log successful responses for debugging
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      dataLength: Array.isArray(response.data) ? response.data.length : 'N/A',
      data: response.data
    });
    return response;
  },
  error => {
    if (error.response) {
      const errorInfo = {
        url: error.config.url,
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
      
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized: Invalid or expired token', errorInfo);
          break;
        case 403:
          console.error('Forbidden: Insufficient permissions', errorInfo);
          break;
        case 429:
          console.error('Too many requests: Rate limit exceeded', errorInfo);
          break;
        default:
          console.error('API Error:', errorInfo);
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

// Check API access and permissions
export const checkApiAccess = async () => {
  try {
    // Test merchants access
    const merchantsResponse = await api.get('/merchants.json', {
      params: { limit: 1 }
    });
    console.log('Merchants access:', {
      hasAccess: true,
      dataAvailable: Array.isArray(merchantsResponse.data) && merchantsResponse.data.length > 0
    });

    // Test vouchers access
    const vouchersResponse = await api.get('/vouchers.json', {
      params: { limit: 1 }
    });
    console.log('Vouchers access:', {
      hasAccess: true,
      dataAvailable: Array.isArray(vouchersResponse.data) && vouchersResponse.data.length > 0
    });

    return {
      merchantsAccess: true,
      vouchersAccess: true
    };
  } catch (error) {
    console.error('API Access Check Failed:', error);
    return {
      merchantsAccess: false,
      vouchersAccess: false,
      error: error.message
    };
  }
};

export const getStores = async () => {
  try {
    const response = await api.get('/merchants.json', {
      params: {
        limit: 100,
        offset: 0,
        minPrograms: 1
      }
    });
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format from merchants API');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const getVouchers = async () => {
  try {
    const response = await api.get('/vouchers.json', {
      params: {
        limit: 100,
        offset: 0,
        voucherTypeId: 1,
        isActive: true
      }
    });
    
    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format from vouchers API');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    throw error;
  }
};