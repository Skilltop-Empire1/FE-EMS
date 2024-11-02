import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const departmentApi = createApi({
  reducerPath: 'department',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://be-ems.onrender.com/api/v1' }),
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
    deleteResource: builder.mutation({
      query: (url) => ({
        url,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchResourceQuery,
  useEditResourceMutation,
  usePostResourceMutation,
  useDeleteResourceMutation,
} = departmentApi;

export default departmentApi;
