import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        assetId: 0,
        assetCurrency: '',
        tickerPrice: {},
        formData: {}
    },
    reducers: {
        updateWalletType(state, action) {
            state.assetId = action.payload.assetId
            state.assetCurrency = action.payload.assetCurrency
        },
        updateTicker(state, action) {
            state.tickerPrice = action.payload
        },
        updateFormData(state, action) {
            state.formData = action.payload
        }
    },
});

export const { updateWalletType, updateTicker, updateFormData } = commonSlice.actions;

export default commonSlice.reducer;
