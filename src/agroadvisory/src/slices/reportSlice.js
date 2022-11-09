import { createSlice } from'@reduxjs/toolkit';

export const reportSlice = createSlice({
    name: 'report',
    initialState: [],
    reducers: {
       // Reducer y acciones asociadas.
       setReportInput: (state, action) => {
        state.push(action.payload);

       }
    },
  });

  // Exportamos los actions desde el slice que acabamos de crear:
export const { setReportInput } = reportSlice.actions;

// Por defecto exportamos la propiedad reducer desde el slice que acabamos de crear:
export default reportSlice.reducer;