import MainLogin from "@/components/Login/MainLogin";
import { Toaster } from "sonner";

export const metadata = {
  title: "TezaShoes - Login",
  description: "Login de la web de TezaShoes",
};

async function urlBase() {
  const urlBaseDev = process.env.URL_BASE_DEV;
  return urlBaseDev;
}

async function Login() {
  const url = await urlBase();

  return (
    <section className="w-full h-full">
      <Toaster position="top-center" />
      <MainLogin url={url} />
      {/*     <MainLoginV1 url={url}/> */}
    </section>
  );
}

export default Login;
