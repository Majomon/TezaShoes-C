import WelcomeRegister from "@/components/Register/WelcomeRegister";
import { Toaster } from "sonner";
import FormRegister from "../../components/Register/FormRegister";

export const metadata = {
  title: "TezaShoes - Registro",
  description: "Registro de la web de TezaShoes",
};

async function urlBase() {
  const urlBaseDev = process.env.URL_BASE_DEV;
  return urlBaseDev;
}

async function Register() {
  const url = await urlBase();

  return (
    <section className="w-full h-full">
      <Toaster position="top-center" />
      <div className="w-full flex items-center justify-center">
        <div className="lg:w-7/12 sm:w-[450px] w-[80%] mx-auto">
          <div className="lg:w-6/12 w-full mx-auto py-5 px-3">
            <WelcomeRegister />
            <FormRegister url={url} />
          </div>
        </div>
        <div className="w-5/12 h-[100vh] hidden lg:block">
          <img
            src="/imgRegistro.jpeg"
            alt="imgRegistro"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </section>
  );
}

export default Register;
