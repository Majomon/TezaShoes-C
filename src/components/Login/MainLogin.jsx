"use client";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import FormLogin from "./FormLogin";
import WelcomeLogin from "./WelcomeLogin";
import { useEffect } from "react";
function MainLogin({ url }) {
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      router.push("/");
    }
  }, [userId, router]);

  return (
    <section className="w-full h-full">
      <Toaster position="top-center" />
      <div className="w-full flex">
        <div className="w-5/12 h-[100vh] -z-30 hidden lg:block">
          <img
            src="/imgLoginLeft.jpg"
            alt="imgLogin"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="lg:w-7/12 sm:w-[450px] w-[80%] flex items-center justify-center mx-auto ">
          <div className="lg:w-6/12 w-full mx-auto">
            <WelcomeLogin />
            <FormLogin url={url} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MainLogin;
