import { configureStore } from "@reduxjs/toolkit"
import StudentSlice from "./slice/StudentSlice"


const store = configureStore({
    reducer: {
        StudentSlice: StudentSlice,
    }
});

export default store;