import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BASE_URL } from '../Lib/GlobalExports';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const API_URL = {
  login: 'auth/login',
  signup: 'user/',
};

export const API_KEYS = {
  login: 'auth/login',
  signup: 'user/',
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

/**
 * Function for making a POST request and handling the response using React Query's useMutation hook.
 *
 * @param {object} queryKey - The key used to identify the query in the query cache.
 * @param {string} url - The URL for the POST request.
 * @param {object} body - The data to be sent in the request body.
 * @param {string} token - The authorization token for the request.
 * @return {object} The mutation object returned by useMutation.
 */
export const usePostFetch = ({ queryKey, url, token }) => {
  try {
    const queryClient = useQueryClient();
    const queryFunc = async ({ body }) => {
      const response = await api.post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
        'Content-Type': 'application/json',
      });
      return response;
    };
    const mutation = useMutation({
      mutationFn: queryFunc,
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    });
    return mutation;
  } catch (error) {
    return error;
  }
};

export const usePostForm = ({ queryKey, url, token }) => {
  try {
    const queryClient = useQueryClient();
    const queryFunc = async ({ body }) => {
      const response = await api.post(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    };
    const mutation = useMutation({
      mutationFn: queryFunc,
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    });
    return mutation;
  } catch (error) {
    return error;
  }
};

/**
 * Fetches data from the specified URL using a PUT request and updates the query cache upon successful mutation.
 *
 * @param {Object} options - The options object containing queryKey, url, body, and token.
 * @return {Mutation} The mutation object for the PUT request.
 */
export const usePutFetch = ({ queryKey, url, body, token }) => {
  try {
    const queryClient = useQueryClient();
    const queryFunc = async () => {
      const response = await api.put(url, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    };
    const mutation = useMutation(queryFunc, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    });
    return mutation;
  } catch (error) {
    return error;
  }
};

/**
 * Custom React hook for making a DELETE request and handling the result using react-query.
 *
 * @param {Object} options - The options object containing queryKey, url, and token for the request.
 * @return {Mutation} The mutation object representing the DELETE request and its handling.
 */
export const useDeleteFetch = ({ queryKey, url, token }) => {
  try {
    const queryClient = useQueryClient();
    const queryFunc = async () => {
      const response = await api.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response;
    };
    const mutation = useMutation(queryFunc, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    });
    return mutation;
  } catch (error) {
    console.error(error);
    return null;
  }
};
