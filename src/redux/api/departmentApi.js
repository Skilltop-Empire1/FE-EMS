import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const departmentApi = createApi({
  reducerPath: 'department',
  baseQuery: fetchBaseQuery({
     baseUrl: 'https://be-ems-production-d07e.up.railway.app/api/v1',
     prepareHeaders: (headers) => {
      const user = localStorage.getItem('user'); // Get the user object
      const token = user ? JSON.parse(user).token : null; // Parse the object and extract the token

      

      // console.log('Token in state:', token);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`); // Attach the token to the header
      }
      return headers;
    },
     }),
  endpoints: (builder) => ({


    fetchResource: builder.query({
      query: (url) => url,
    }),
    fetchProfileImage: builder.query({
      query: ({ url, token }) => ({
        url,
        headers: {'Authorization': token ? `Bearer ${token}` : '',},
      }),
    }),
    editResource: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "PUT",
        body: data,
        // headers: { 'Content-Type': 'application/json' },
      }),
    }),

    postProfileImage: builder.mutation({
      query: ({ url, data }) => {

        const user = localStorage.getItem("user");
        const token = user ? JSON.parse(user).token : null;

        return {
          url,
          method: 'POST',
          body: data,
          headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            // 'Content-Type': 'multipart/form-data',
          },
        };
      },
    }),
    
    postResource: builder.mutation({
      query: ({ url, data }) => ({
        url,
        method: "POST",
        body: data,
        // headers: { 'Content-Type': 'application/json' },
      }),
    }),


    deleteResource: builder.mutation({
      query: (url) => ({
        url,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchResourceQuery,
  useEditResourceMutation,
  usePostResourceMutation,
  useDeleteResourceMutation,
  usePostProfileImageMutation,
  useFetchProfileImageQuery
} = departmentApi;

export default departmentApi;
