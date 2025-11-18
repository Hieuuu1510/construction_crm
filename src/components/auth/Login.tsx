import { Button } from "@/components/ui/button";
import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginDto, loginSchema } from "@/schemas/auth.schema";
import { useLogin } from "@/queries/auth.query";
import { toast } from "sonner";
import { useAppDispatch } from "@/stores/hook";
import { setAuth } from "@/stores/slices/authSlice";
import CookieManager from "@/manager/CookieManager";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const mutationLogin = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const _login = (data: LoginDto) => {
    mutationLogin
      .mutateAsync(data)
      .then((res) => {
        toast.success(res.message);
        dispatch(
          setAuth({
            user: res.data,
          })
        );
        sessionStorage.setItem("accessToken", res.token);
        CookieManager.setCookie("refreshToken", res.refetchToken);
        navigate({ to: "/" });
      })
      .catch(({ response: { data: err } }) => {
        toast.error(err.err_message);
      });
  };

  return (
    <div className="mx-auto my-0 max-w-[90%] h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex-row justify-between">
          <div className="flex-col gap-2 w-3/5">
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </div>
          {/* <CardAction> */}
          <Button
            className="w-2/5 justify-end"
            variant="link"
            onClick={() => {
              navigate({ to: "/auth/register" });
            }}
          >
            Sign Up
          </Button>
          {/* </CardAction> */}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(_login)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>
                      <FormDescription className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                        Forgot your password?
                      </FormDescription>
                    </div>

                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="m@example.com"
                          type={showPassword ? "text" : "password"}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? (
                            <PiEyeLight className="h-4 w-4" />
                          ) : (
                            <PiEyeSlashLight className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <CardFooter className="flex-col gap-2 p-0">
                <Button type="submit" className="w-full ">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
