import { AUTH_API } from "@/api/api-endpoints";
import { IUser } from "@/interface/user.interface";
import { CancelToken } from "axios";

class authRepo {
  async me(cancelToken?: CancelToken | AbortSignal) {
    const path = AUTH_API.ME();
    return await ApiIdentity.get(path, {
      cancelToken: cancelToken instanceof AbortSignal ? undefined : cancelToken,
    });
  }

  async register(data: IUser) {
    const path = AUTH_API.REGISTER();
    return await ApiIdentity.post(path, data);
  }

  async login(data: IUser) {
    const path = AUTH_API.LOGIN();
    return await ApiIdentity.post(path, data);
  }

  async logout(refreshToken: string) {
    const path = AUTH_API.LOGOUT();
    return await ApiIdentity.post(path, { refreshToken });
  }

  async refreshToken(refreshToken: string) {
    const path = AUTH_API.REFRESH_TOKEN();
    return await ApiIdentity.post(path, { refreshToken });
  }
}

export default new authRepo();
