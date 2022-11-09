import { SET_REPORT } from "../../constants/actionTypes"

const setReport = (homeForm) => {
    return{
        type: SET_REPORT,
        payload: homeForm
    }

}