import { configureStore } from '@reduxjs/toolkit'
import { reportReducer } from '../../slices/reportSlice'

export default configureStore({
  reducer: {
    report: reportReducer

  },
})