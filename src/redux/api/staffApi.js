import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a base URL for the API
const BASE_URL = "https://be-ems.onrender.com/api/v1";

// Create the staff API slice
const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["StaffList", "InviteStaffList"], // Define tag type for staff data

  endpoints: (builder) => ({
    fetchStaff: builder.query({
      query: (endpoint) => endpoint,
      providesTags: ["StaffList"], // Tag provided for staff data
    }),
    fetchAllStaff: builder.query({
      query: ({ endpoint, page, limit }) => ({
        url: endpoint,
        params: { page, limit },
      }),
      providesTags: ["StaffList"], // Tag provided for staff data
    }),

    editStaff: builder.mutation({
      query: ({ staffId, data }) => ({
        url: `/staff/edit/${staffId}`,
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["StaffList"], // Invalidate on edit
    }),

    createStaff: builder.mutation({
      query: (data) => ({
        url: "/staff/create",
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["StaffList"], // Invalidate on create
    }),

    inviteStaff: builder.mutation({
      query: (data) => ({
        url: "/staff/invite",
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["InviteStaffList"], // Invalidate on create
    }),

    editInviteStaff: builder.mutation({
      query: (staffId, data) => ({
        url: `/staff/update/${staffId}`,
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["InviteStaffList"], // Invalidate on create
    }),

    deleteStaff: builder.mutation({
      query: (staffId) => ({
        url: `/staff/delete/${staffId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StaffList"], // Invalidate on delete
    }),
  }),
});

// Export hooks generated by createApi
export const {
  useFetchStaffQuery,
  useFetchAllStaffQuery,
  useEditStaffMutation,
  useEditInviteStaffMutation,
  useCreateStaffMutation,
  useInviteStaffMutation,
  useDeleteStaffMutation,
} = staffApi;

// Export the staffApi itself for integration in the store
export default staffApi;
