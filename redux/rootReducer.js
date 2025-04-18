import { reducer } from "./reducer";
import { combineReducers } from "redux";
import WorkSheetReducer from "./slices/worksheetSlice";
import GuestListReducer from "./slices/guestListSlice";
import NoticeListReducer from "./slices/noticeListSlice";
import SeminarListReducer from "./slices/seminarListSlice";
import TargetAndAchiveReducer from "./slices/targetAndAchiveSlice";
import LoginReducer from "./slices/loginSlice";
import ClassListReducer from "./slices/classListSlice";
import StudentsListReducer from "./slices/studentsListSlice";
import GetListReducer from "./slices/getListSlice";
import UserListReducer from "./slices/userListSlice";
import DashReducer from "./slices/dashSlice";





export default combineReducers({
    reducer, 
    WorkSheetReducer, 
    GuestListReducer,
    NoticeListReducer,
    ClassListReducer,
    StudentsListReducer,
    SeminarListReducer,
    TargetAndAchiveReducer,
    LoginReducer,
    GetListReducer,
    UserListReducer,
    DashReducer,
});