import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const departmentApi = createApi({
  reducerPath: 'department',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    fetchResource: builder.query({
      query: (url) => url,
    }),
    editResource: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: 'PUT',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
    postResource: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const {
  useFetchResourceQuery,
  useEditResourceMutation,
  usePostResourceMutation,
} = departmentApi;

export default departmentApi;
