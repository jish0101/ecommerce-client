import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../Lib/GlobalExports';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const URL_KEYS = {
  login: 'auth/login',
  signup: 'auth/signup',
};

/**
 * Fetches data based on the provided query key, URL, page, filters, and token.
 *
 * @param {Object} queryKey - The key used for the query
 * @param {string} url - The URL for the API endpoint
 * @param {number} isPage - The page number
 * @param {Object} filters - The filters for the query
 * @param {string} token - The authentication token
 * @return {Object} The result of the query
 */
export const useGetFetch = ({ queryKey, url, isPage, filters, token }) => {
  try {
    let endPoint;

    if (isPage) {
      endPoint = `${url}?page=${isPage}`;
    } else {
      endPoint = `${url}?`;
    }

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (key && value) {
          endPoint += `&${key}=${value}`;
        }
      });
    }

    const queryFunc = async () => {
      const response = await api.get(endPoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    };

    return useQuery(queryKey, queryFunc, {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retryDelay: Infinity,
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};
