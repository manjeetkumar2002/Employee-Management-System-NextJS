import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// GET API
export const fetchAllEmployees = createAsyncThunk(
  "employees/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/api/employees");
      if (!res.ok) {
        throw new Error("Employee fetch error");
      }
      const data = await res.json();
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch employees :" + error);
    }
  },
);
// POST API
export const createEmployee = createAsyncThunk(
  "employees/create",
  async (employeeData, thunkAPI) => {
    try {
      const employee = employeeData;
      if (
        !employee?.name ||
        !employee.email ||
        !employee.phone ||
        !employee.position
      ) {
        throw new Error("All fields are required");
        return;
      }

      const res = await fetch(`/api/employees/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create employee");
      }
      alert(data.message || "Employee created successfully");
      fetchAllEmployees();
      return data.data;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return thunkAPI.rejectWithValue(`Error creating employee: ${message}`);
    }
  },
);
// PUT API
export const updateEmployee = createAsyncThunk(
  "employees/update",
  async (formData, thunkAPI) => {
    try {
      const employee = formData;
      if (
        !employee?.name ||
        !employee.email ||
        !employee.phone ||
        !employee.position
      ) {
        throw new Error("Some field are missing");
      }

      const res = await fetch(`/api/employees/${employee._id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      const data = await res.json();
      fetchAllEmployees()
      alert("Employee updated succesfully");
      return data.data
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      return thunkAPI.rejectWithValue(`Error creating employee: ${message}`);
    }
   
  },
);
// DELETE API
export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchAllEmployees(); // Refresh the table after deletion
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete employee :" + error);
    }
  },
);
const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(fetchAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeesSlice.reducer;
