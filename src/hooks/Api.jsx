const baseURL = 'https://be-ems-production-2721.up.railway.app';

// Staff API

// Get staff list
export const listStaff = async () => {
  try {
    const response = await fetch(`https://be-ems-production-2721.up.railway.app/api/v1/staff/list`, {
        method: 'GET', 
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json', // Specify the content type
            // 'Authorization': '20240831182156', // Include your authorization token if needed
            // Add other custom headers as needed
        },
    });
    if (!response.ok) {
      throw new Error('Error fetching staff list');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching staff list:', error);
  }
};

// Create staff
export const createStaff = async (staffData) => {
    try {
      const response = await fetch(`${baseURL}/api/v1/staff/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });
  
      const contentType = response.headers.get('content-type');
  
      if (!response.ok) {
        const errorMessage = contentType.includes('application/json')
          ? await response.json()
          : await response.text();
        throw new Error(errorMessage);
      }
  
      // Parse response as JSON
      return contentType.includes('application/json')
        ? await response.json()
        : response.text();
    } catch (error) {
      console.error('Error creating staff:', error);
      alert('Error creating staff.');
    }
  };

// Update staff
export const updateStaff = async (id, staffData) => {
  try {
    const response = await fetch(`${baseURL}/api/v1/staff/edit?id=${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(staffData),
    });
    if (!response.ok) {
      throw new Error('Error updating staff');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating staff:', error);
  }
};

// Delete staff
export const deleteStaff = async (id) => {
  try {
    const response = await fetch(`${baseURL}/api/v1/staff/delete?id=${id}`, {
      method: 'DELETE',
    });

    // Check if the response is JSON or not
    const contentType = response.headers.get('Content-Type');
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text(); // If it's not JSON, let it treat it as text
    }

    if (!response.ok) {
      throw new Error(data.message || data || 'Failed to delete staff');
    }

    return data;
  } catch (error) {
    console.error('Error deleting staff:', error.message || error);
  }
};

// Search staff
export const searchStaff = async (name, specialization, practice) => {
  try {
    const url = new URL(`${baseURL}/api/v1/staff/searchStaff`);
    url.searchParams.append('name', name);
    url.searchParams.append('specialization', specialization);
    url.searchParams.append('practice', practice);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error searching staff');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching staff:', error);
  }
};

// Patient API

// Query all patients
export const listPatients = async () => {
  try {
    const response = await fetch(`https://be-ems-production-2721.up.railway.app/api/v1/patient/list`, {
      method: 'GET', 
      // mode: 'no-cors',
      headers: {
          'Content-Type': 'application/json', // Specify the content type
          // 'Authorization': '20240831182156', // Include your authorization token if needed
          // Add other custom headers as needed
      },
  });
    if (!response.ok) {
      throw new Error('Error listing patients');
    }
    return await response.json();
  } catch (error) {
    console.log('Error listing patients:', error);
  }
};

// Create patient
export const createPatient = async (patientData) => {
  try {
    const response = await fetch(`${baseURL}/api/v1/patient/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });

    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      const errorMessage = contentType.includes('application/json')
        ? await response.json()
        : await response.text();
      throw new Error(errorMessage);
    }

    // Parse response as JSON
    return contentType.includes('application/json')
      ? await response.json()
      : response.text();
  } catch (error) {
    console.error('Error creating patient:', error);
    alert('Error creating patient.');
  }
};

// Count patients
export const countPatients = async () => {
  try {
    const response = await fetch(`${baseURL}/api/v1/patient/count`);
    if (!response.ok) {
      throw new Error('Error counting patients');
    }
    return await response.json();
  } catch (error) {
    console.error('Error counting patients:', error);
  }
};

// Update patient
export const editPatient = async (patientData) => {
  try {
    const response = await fetch(`${baseURL}/api/v1/patient/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patientData),
    });
    if (!response.ok) {
      throw new Error('Error updating patient');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating patient:', error);
  }
};

// Delete patient
export const deletePatient = async (mobile_no) => {
  try {
    const response = await fetch(`${baseURL}/api/v1/patient/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mobile_no }),
    });

    // Handle the response as before
  } catch (error) {
    console.error('Error deleting patient:', error.message || error);
  }
};