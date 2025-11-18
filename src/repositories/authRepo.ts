import { AUTH_API } from "@/api/api-endpoints";
import ApiClient from "@/config/apiConfig";
import { IUser } from "@/interface/user.interface";
import { LoginDto, RegisterDto } from "@/schemas/auth.schema";
import { CancelToken } from "axios";

class authRepo {
  async me(cancelToken?: CancelToken | AbortSignal) {
    const path = AUTH_API.ME();
    return await ApiClient.GET(path, {
      cancelToken: cancelToken instanceof AbortSignal ? undefined : cancelToken,
    });
  }

  async register(data: RegisterDto) {
    const path = AUTH_API.REGISTER();
    return await ApiClient.POST(path, data);
  }

  async login(data: LoginDto) {
    const path = AUTH_API.LOGIN();
    return await ApiClient.POST(path, data);
  }

  async logout(refreshToken: string) {
    const path = AUTH_API.LOGOUT();
    return await ApiClient.POST(path, { refreshToken });
  }

  async refreshToken(refreshToken: string) {
    const path = AUTH_API.REFRESH_TOKEN();
    return await ApiClient.POST(path, { refreshToken });
  }

  async changePassword(data: IUser) {
    const path = AUTH_API.CHANGE_PASSWORD();
    return await ApiClient.PUT(path, data);
  }
}

export default new authRepo();
