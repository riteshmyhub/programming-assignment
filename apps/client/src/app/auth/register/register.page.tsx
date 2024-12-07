import { Button } from "@/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/card";
import { Input } from "@/ui/input";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowLeftIcon, LoaderCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/api/store";
import { authService } from "@/api/services/auth.service";

export default function RegisterPage() {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { register } = useAppSelector((state) => state.authReducer);

   const handleSubmit = async (values: { fullname: string; email: string; password: string }) => {
      try {
         await dispatch(authService.register.api(values)).unwrap();
         navigate("/auth/login");
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
                  Create Bank Account
               </CardTitle>
               <CardDescription>Fill out the form below to open your new account</CardDescription>
            </CardHeader>
            <CardContent>
               <Formik //
                  initialValues={{ fullname: "", email: "", password: "" }}
                  validationSchema={Yup.object({
                     fullname: Yup.string().required("Full Name is required"),
                     email: Yup.string().email("Invalid email address").required("Email is required"),
                     password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
                  })}
                  onSubmit={handleSubmit}>
                  <Form className="grid gap-4">
                     <div className="grid">
                        <Field //
                           as={Input}
                           label="Full name"
                           id="fullname"
                           name="fullname"
                           type="text"
                           placeholder="John Doe"
                           required
                        />
                        <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm" />
                     </div>
                     <div className="grid">
                        <Field //
                           as={Input}
                           label="Email"
                           id="email"
                           name="email"
                           type="email"
                           placeholder="johndoe@example.com"
                           required
                        />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                     </div>
                     <div className="grid">
                        <Field //
                           as={Input}
                           label="Password"
                           id="password"
                           name="password"
                           type="password"
                           placeholder="Create a strong password"
                           required
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                     </div>
                     <Button type="submit" className="w-full uppercase" disabled={register?.isLoading}>
                        {register?.isLoading && <LoaderCircle className="spin" />}
                        Create Account
                     </Button>
                  </Form>
               </Formik>
            </CardContent>
         </Card>
      </div>
   );
}
