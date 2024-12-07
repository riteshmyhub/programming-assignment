import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { Link, useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeftIcon, LoaderCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { authService } from "@/api/services/auth.service";

export default function LoginPage() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { login } = useAppSelector((state) => state.authReducer);
   const handleSubmit = async (values: { userID: string; password: string }) => {
      try {
         await dispatch(authService.login.api(values)).unwrap();

         navigate("/account");
      } catch (error) {
         return;
      }
   };

   return (
      <div className="flex h-screen w-full items-end md:items-center justify-center md:p-5 bg-gradient-to-br from-blue-600 to-green-500 text-white px-4">
         <Card className="mx-auto w-full md:w-[30%]">
            <CardHeader>
               <CardTitle className="text-2xl flex items-center gap-3">
                  <ArrowLeftIcon onClick={() => navigate("/")} />
                  Login
               </CardTitle>
               <CardDescription>Enter your User ID below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
               <Formik
                  initialValues={{ userID: "", password: "" }}
                  validationSchema={Yup.object({
                     userID: Yup.string().required("User ID is required"),
                     password: Yup.string().required("Password is required"),
                  })}
                  onSubmit={handleSubmit}>
                  <Form className="grid gap-4">
                     <div className="grid">
                        <Field //
                           as={Input}
                           id="userID"
                           label="User ID"
                           name="userID"
                           type="text"
                           placeholder="Enter your User ID"
                           required
                        />
                        <ErrorMessage name="userID" component="div" className="text-red-500 text-sm" />
                     </div>
                     <div className="grid">
                        <Field //
                           as={Input}
                           label="Password"
                           id="password"
                           name="password"
                           type="password"
                           placeholder="Enter your password"
                           required
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                     </div>
                     <Button type="submit" className="w-full uppercase" disabled={login.isLoading}>
                        {login.isLoading && <LoaderCircle className="spin" />} Login
                     </Button>
                  </Form>
               </Formik>
               <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link to="../register" className="underline">
                     Sign up
                  </Link>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
