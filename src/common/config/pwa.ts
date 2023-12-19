import app from "./app";

const PWA = {
  createPasswordCodeURl(code: string) {
    return `http://${app.pwaUrl}/auth/create-password?code=${code}`;
  },
};

export default PWA;
