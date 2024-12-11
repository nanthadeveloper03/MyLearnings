import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    isTheme: 'is_light'
  },
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.voucher=null
    },
    changeTheme(state, action) {
      state.isTheme = action.payload;
    },
    openOrders(state, action) {
      state.orders = action.payload;
    },
    refreshBalance(state, action) {
      state.balances = action.payload;
    },
    voucherCoupen(state, action) {
      state.voucher = action.payload;
    }
  },
});

export const { loginSuccess, logout, changeTheme,openOrders,refreshBalance,voucherCoupen } = authSlice.actions;

export default authSlice.reducer;
