import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import { RegisterDto, registerSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useRegister } from "@/queries/auth.query";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const Register = () => {
  const navigate = useNavigate();
  const mutation = useRegister();
  const form = useForm<RegisterDto>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phone: "",
    },
  });

  const _register = (data: RegisterDto) => {
    console.log(data);
    mutation
      .mutateAsync(data)
      .then((res) => {
        console.log(res);
        toast.success(res.message);
        // navigate({ to: "/auth/login" });
      })
      .catch(({ response: { data: err } }) => {
        console.log(data);
        toast.error(err.err_message);
      });
  };

  return (
    <div className="mx-auto my-0 max-w-[90%] h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="flex-row justify-between items-center">
          <div>
            <CardTitle>Register</CardTitle>
          </div>
          <div className="!mt-0">
            <Button
              className=" justify-end !mt-0 !p-0 items-center"
              variant="link"
              onClick={() => navigate({ to: "/auth/login" })}
            >
              Login
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(_register)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên người dùng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
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
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mật khẩu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex-col gap-2 p-0">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={mutation.isPending}
                  size="lg"
                >
                  {mutation.isPending && <Spinner className=" size-4" />}
                  Register
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
