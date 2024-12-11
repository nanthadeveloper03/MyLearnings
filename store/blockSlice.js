import { createSlice } from '@reduxjs/toolkit';

const blockSlice = createSlice({
    name: 'block',
    initialState: {
        isMaintenance: false,
        maintenanceTxt: null,
        isBlocked: null,
        siteSocialLinks: {}
    },
    reducers: {
        checkMaintenance(state, action) {
            state.isMaintenance = action.payload.maintenanceMode;
            state.maintenanceTxt = action.payload.maintenanceTxt;
        },
        checkBlocked(state, action) {
            state.isBlocked = action.payload;
        },
        socialLinks(state, action) {
            state.siteSocialLinks = action.payload;
        }
    },
});

export const { checkMaintenance, checkBlocked, socialLinks } = blockSlice.actions;

export default blockSlice.reducer;
