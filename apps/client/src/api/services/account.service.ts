import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import HttpInterceptor from "../interceptor/http.interceptor";
import { ITransaction } from "../interfaces/transaction.interfaces";

type DepositMoneyProps = {
   amount: string;
   description?: string;
};

type WithdrawMoney = {
   amount: string;
   description?: string;
};
const initialState = {
   requestBalance: {
      isLoading: true,
      data: null as null | string,
   },
   depositMoney: {
      isLoading: false,
   },
   withdrawMoney: {
      isLoading: false,
   },
   transactionHistory: {
      isLoading: true,
      data: [] as ITransaction[],
   },
};

class AccountService extends HttpInterceptor {
   requestBalance = {
      api: createAsyncThunk("requestBalance*", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get("/account/request-balance");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.requestBalance.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            console.log(action.payload?.data);
            state.requestBalance.isLoading = false;
            state.requestBalance.data = action.payload?.data?.amount;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.requestBalance.isLoading = false;
            state.requestBalance.data = null;
         });
      },
   };

   depositMoney = {
      api: createAsyncThunk("depositMoney", async (payload: DepositMoneyProps, thunkAPI) => {
         try {
            const { data } = await this.http.put("/account/deposit-money", payload);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.depositMoney.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.depositMoney.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.depositMoney.isLoading = false;
         });
      },
   };

   withdrawMoney = {
      api: createAsyncThunk("withdrawMoney", async (payload: WithdrawMoney, thunkAPI) => {
         try {
            const { data } = await this.http.put("/account/withdraw-money", payload);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.withdrawMoney.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.withdrawMoney.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.withdrawMoney.isLoading = false;
         });
      },
   };

   getTransactionHistory = {
      api: createAsyncThunk("getTransactionHistory*", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get("/account/transaction-history");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.transactionHistory.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.transactionHistory.isLoading = false;
            state.transactionHistory.data = action.payload?.data?.transaction_history;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.transactionHistory.isLoading = false;
            state.transactionHistory.data = [];
         });
      },
   };
   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.requestBalance.reducer(builder);
         this.depositMoney.reducer(builder);
         this.withdrawMoney.reducer(builder);
         this.getTransactionHistory.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const accountService = new AccountService();
export const accountActions = accountService.actions;
export const accountReducer = accountService.reducer;
