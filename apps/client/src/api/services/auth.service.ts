import HttpInterceptor from "../interceptor/http.interceptor";
import { ActionReducerMapBuilder, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthUser } from "../interfaces/auth-user.interfaces";

const initialState = {
   accessToken: localStorage.getItem("accessToken") || null,
   login: {
      isLoading: false,
   },
   logout: {
      isLoading: false,
   },
   register: {
      isLoading: false,
   },
   session: {
      isLoading: true,
      data: null as null | IAuthUser,
   },
};

class AuthService extends HttpInterceptor {
   register = {
      api: createAsyncThunk("register", async (credentials: any, thunkAPI) => {
         try {
            const { data } = await this.http.post("/auth/register", credentials);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.register.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.register.isLoading = false;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.register.isLoading = false;
         });
      },
   };

   login = {
      api: createAsyncThunk("login", async (credentials: any, thunkAPI) => {
         try {
            const { data } = await this.http.post("/auth/login", credentials);
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.login.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action) => {
            state.login.isLoading = false;
            state.accessToken = action.payload?.data?.accessToken;
            localStorage.setItem("accessToken", action.payload?.data?.accessToken);
         });
         builder.addCase(this.api.rejected, (state) => {
            state.login.isLoading = false;
         });
      },
   };

   session = {
      api: createAsyncThunk("session*", async (_, thunkAPI) => {
         try {
            const { data } = await this.http.get("/auth/session");
            return data;
         } catch (error) {
            return thunkAPI.rejectWithValue(this.errorMessage(error));
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.session.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state, action: PayloadAction<{ data: { user: IAuthUser } }>) => {
            state.session.isLoading = false;
            state.session.data = action.payload?.data?.user;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.session.isLoading = false;
            state.session.data = null;
         });
      },
   };

   logout = {
      api: createAsyncThunk("logout", async (_, thunkAPI) => {
         try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            localStorage.removeItem("accessToken");
            return { message: "You have successfully logged out!" };
         } catch (error: any) {
            return thunkAPI.rejectWithValue("logout error");
         }
      }),
      reducer(builder: ActionReducerMapBuilder<typeof initialState>) {
         builder.addCase(this.api.pending, (state) => {
            state.logout.isLoading = true;
         });
         builder.addCase(this.api.fulfilled, (state) => {
            state.logout.isLoading = false;
            state.session.data = null;
            state.accessToken = null;
         });
         builder.addCase(this.api.rejected, (state) => {
            state.logout.isLoading = false;
         });
      },
   };

   private slice = createSlice({
      name: "AuthService",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
         this.login.reducer(builder);
         this.session.reducer(builder);
         this.logout.reducer(builder);
         this.register.reducer(builder);
      },
   });
   public actions = this.slice.actions;
   public reducer = this.slice.reducer;
}

export const authService = new AuthService();
export const authActions = authService.actions;
export const authReducer = authService.reducer;
