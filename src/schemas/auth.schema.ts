import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Email không hợp lệ!"),
  password: z.string().min(6, "Mật khâu phải nhất 6 ký tự!"),
});

export const registerSchema = z.object({
  email: z.email("Email không hợp lệ!"),
  password: z.string().min(6, "Mật khẩu phải nhất 6 ký tự!"),
  username: z.string().min(6, "Tên người dùng phải nhất 6 ký tự!"),
  phone: z.string().min(10, "Sđt phải nhất 10 số!"),
});

// export type
export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
