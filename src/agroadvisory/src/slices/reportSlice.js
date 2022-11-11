import { createSlice } from'@reduxjs/toolkit';

export const reportSlice = createSlice({
    name: 'report',
    initialState: {
      type: null,
      region: null,
      zone: null,
      woreda: null,
      kebele: null,
      ad_fertilizer: null,
      ad_aclimate: null,
      ad_isfm: null

    },
    reducers: {
       // Reducer y acciones asociadas.
       setReportInput: (state, action) => {

        const { type, region, zone, woreda, kebele, ad_fertilizer, ad_aclimate, ad_isfm } = action.payload.formValues;
        Object.assign(state, { type, region, zone, woreda, kebele, ad_fertilizer, ad_aclimate, ad_isfm });
        console.log(state);

       }
    },
  });

console.log(reportSlice);
  // Exportamos los actions desde el slice que acabamos de crear:
export const { setReportInput } = reportSlice.actions;

// Por defecto exportamos la propiedad reducer desde el slice que acabamos de crear:
export default reportSlice.reducer;

