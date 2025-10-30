interface IOptionsSetCookie {
  secure?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  domain?: string;
}

class CookieManager {
  setCookie = (
    name: string,
    value: string,
    days?: number,
    options?: IOptionsSetCookie
  ) => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    let cookieString = name + "=" + (value || "") + expires + "; path=/";

    // Append secure attribute if specified
    if (options?.secure) {
      cookieString += "; Secure";
    }

    // Append sameSite attribute if specified
    if (options?.sameSite) {
      cookieString += `; SameSite=${options.sameSite}`;
    }

    // Append domain attribute if specified
    if (options?.domain) {
      cookieString += `; Domain=${options.domain}`;
    }

    document.cookie = cookieString;
  };

  removeCookie = (name: string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    // if(!!String(process.env.PUBLIC_URL)){
    //   const domain = `; domain=.${String(process.env.PUBLIC_URL)}`;
    //   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/" + domain;
    // }else{
    //   document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    // }
  };
  getCookie = (cname: string) => {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  removeAllCookies = () => {
    document.cookie.split("; ").forEach((cookie) => {
      const [name] = cookie.split("=");

      // Xóa trên các path và domain khác nhau
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

      ["", `.${location.hostname}`, location.hostname].forEach((domain) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${window.location.pathname}; domain=${domain}`;
      });
    });
  };
}

export default new CookieManager();
