"use client";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconMail, IconMap, IconPhone } from "../../../assets/contact/contact";
import LogoTeza from "../../../assets/image/logoTeza.png";
import {
  IconFooterFacebook,
  IconFooterInstagram,
} from "../../../assets/socialMedia/SocialMedia";

const optionsRedes = [
  {
    name: "Facebook",
    action: "url",
    to: "https://www.facebook.com/",
    icon: (
      <IconFooterFacebook className="w-[24px] h-[24px] rounded-[100px] bg-red-500" />
    ),
  },
  {
    name: "Instagram",
    action: "url",
    to: "https://www.instagram.com/",
    icon: <IconFooterInstagram className="w-[24px] h-[24px] rounded-[100px]" />,
  },
];

const linkPage = [
  {
    name: "INICIO",
    to: "/",
  },
  {
    name: "PREGUNTAS FRECUENTES",
    to: "/frequentQuestions",
  },
  {
    name: "CONTACTOS",
    to: "/contact",
  },
  {
    name: "INICIAR SECION",
    to: "/login",
  },
];

const optionContac = [
  {
    text: "1159728345",
    icon: <IconPhone className="w-[18px] h-[18px]" />,
    url: "https://wa.me/+5491159728345",
  },
  {
    text: "infotezashoes@gmail.com",
    icon: <IconMail className="w-[18px] h-[18px]" />,
    url: "#",
  },
  {
    text: "Belgrano 170 - San Isidro",
    icon: <IconMap className="w-[18px] h-[18px]" />,
    url: "https://www.google.com/maps/place/Belgrano+170,+San+Isidro",
  },
];

function Footer() {
  const startTime = Cookies.get("timePurchase");
  const pathname = usePathname();

  if (pathname.startsWith("/purchase")) {
    return null;
  }

  if (startTime) return null;

  return (
    <footer className="w-full h-fit py-3 md:py-0 md:h-[250px] text-colorWhite-100 bg-gradient-to-r from-black via-zinc-800 to-zinc-600 from-65% flex flex-col items-center justify-center gap-y-[30px]">
      <div className="w-11/12 mx-auto justify-center items-center md:gap-[50px] flex flex-col md:flex-row h-fit gap-y-5">
        <section className="w-[111px] h-[75px] flex-col justify-between items-center inline-flex">
          <Image src={LogoTeza} className="w-[111px] h-12" alt="imgFooter" />
          <section className="flex gap-6 py-2">
            {optionsRedes.map((elem, index) => {
              const { name, action, to, icon } = elem;
              return (
                <Link key={index} href={to} name={name} target="_blank">
                  {icon}
                </Link>
              );
            })}
          </section>
        </section>
        <div className="w-[80px] h-[0px] rotate-90 border border-amber-500 hidden md:block"></div>
        <section className="w-fit md:w-fit h-full flex flex-row flex-wrap md:flex-col md:items-start gap-3 items-center justify-center">
          {linkPage.map((item, index) => {
            const { name, to } = item;
            return (
              <Link key={index} href={to}>
                <p className="text-[0.9rem] font-light hover:text-colorGray-100 md:text-left text-center">
                  {name}
                </p>
              </Link>
            );
          })}
        </section>
        <div className="w-[80px] h-[0px] rotate-90 border border-amber-500 hidden md:block"></div>
        <section className="w-fit h-full flex flex-col sm:flex-row items-center justify-center md:flex-col md:items-start gap-2.5">
          {optionContac.map((item, index) => {
            const { text, icon, url } = item;
            return (
              <Link
                key={index}
                className="flex flex-row justify-start gap-[3px] "
                href={url}
                target="_blank"
              >
                {icon}
                <p className="text-[0.9rem] font-light hover:text-colorGray-100">
                  {text}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
      <div className="w-11/12 mx-auto text-center flex flex-col sm:flex-row justify-center items-center gap-2 py-6 border-t border-white/10">
        <span className="text-white text-[1rem] font-light font-['Martel']">
          © {new Date().getFullYear()} Todos los derechos reservados
        </span>

        <section className="flex flex-row gap-x-2 items-center">
          <span className="text-white text-[1rem] font-bold font-['Martel']">
            TEZA
          </span>
          <span className="text-white text-[1rem] font-bold font-['Martel']">
            -
          </span>
          <Link
            href="https://www.instagram.com/paltaniok"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#4F9654] to-[#2E7B32] bg-clip-text text-transparent text-[1rem] font-bold font-['Martel'] hover:opacity-80 transition-opacity"
          >
            PALTANI
          </Link>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
