import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import FormContact from "@/components/FormContact/FormContact";
import PageRouting from "@/components/PageRouting/PageRouting";
import {
  iconEmail,
  iconFacebook,
  iconInstagram,
  iconLocation,
  iconWhatApp,
} from "@/utils/iconsContact";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner";
import {
  IconEmailContact,
  IconFacebookContact,
  IconInstgramContact,
  IconMapContact,
  IconTelContact,
  IconWhatsappContact,
} from "../../../assets/PageContact/IconsPageContacts";
import bgContact from "../../../assets/image/backgroundImageContactMain.png";

const options = [
  {
    name: "Facebook",
    action: "url",
    to: "https://www.facebook.com/",
    icon: iconFacebook,
  },
  {
    name: "Instagram",
    action: "url",
    to: "https://www.instagram.com/",
    icon: iconInstagram,
  },
  {
    name: "1122334455",
    action: "url",
    to: "https://www.whatsapp.com/?lang=es_LA",
    icon: iconWhatApp,
  },
  {
    name: "Ubicación",
    action: "url",
    to: "https://www.google.com/maps/@20.2746259,-98.963968,16z?hl=es-MX&entry=ttu",
    icon: iconLocation,
  },
  { name: "Email", action: "email", icon: iconEmail },
];

const listContactSocialMedia = [
  {
    image: <IconMapContact />,
    title: "Direccion",
    subTitle: "Calle falsa 123",
  },
  {
    image: <IconEmailContact />,
    title: "Correo",
    subTitle: "zapatillas@gmail.com",
  },
  {
    image: <IconTelContact />,
    title: "Telefonos",
    subTitle: "11223344556",
  },
];

const listSocialMediaOptions = [
  {
    name: "facebook",
    icon: <IconFacebookContact />,
    href: "https://www.facebook.com/",
  },
  {
    name: "instagram",
    icon: <IconInstgramContact />,
    href: "https://www.instagram.com/",
  },
  {
    name: "whatsapp",
    icon: <IconWhatsappContact />,
    href: "https://api.whatsapp.com/send/?phone=541159728345",
  },
];

export default function Contact() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center">
      <Toaster position="top-center" />

      <section className="w-full h-[200px] relative top-0 left-0 flex flex-col items-center justify-center gap-y-5">
        <Image
          src={bgContact}
          className="w-full h-full absolute top-0 left-0 object-cover object-top -z-10 "
          alt="banner main search"
        />

        <h1 className="opacity-60 text-center text-white text-3xl font-normal font-['Martel'] tracking-[6.40px] md:tracking-[14.40px] md:text-4xl uppercase w-full">
          Contactanos
        </h1>

        <PageRouting currentRuat={"Contactos"} />
      </section>

      <section className="flex flex-col items-center gap-y-2 my-6 px-1">
        <h2 className="text-center text-neutral-950 text-[26px] md:text-[32px] font-medium ">
          Ponete en contacto con nosotros
        </h2>
        <div className="text-center text-sm ">
          <h2 className="text-neutral-950 text-lg font-normal font-['Martel'] my-2">
            Horario de atención:
          </h2>
          <div className="flex flex-col gap-y-2">
            <p className="text-colorGoldSecundary-500 text-lg font-semibold font-['Martel']">
              Lunes a viernes:
              <span className="text-neutral-950 text-lg font-normal font-['Martel'] pl-1">
                9:00 hs - 18:00 hs
              </span>
            </p>
            <p className="text-colorGoldSecundary-500 text-lg font-semibold font-['Martel']">
              Sabados:
              <span className="text-neutral-950 font-normal text-lg font-['Martel'] pl-1">
                10:00 hs - 17:00 hs
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-row gap-x-[150px] flex-wrap justify-center gap-y-3 h-fit relative mb-12">
        {listContactSocialMedia.map((item, index) => {
          const { image, title, subTitle } = item;
          return (
            <ContactSocialMedia
              key={index}
              image={image}
              title={title}
              subTitle={subTitle}
            />
          );
        })}
        <div className="w-[110px] h-[0px] origin-top-left rotate-90 border-1 border-colorGoldSecundary-500 absolute top-0 left-[30%] hidden md:block"></div>
        <div className="w-[110px] h-[0px] origin-top-left rotate-90 border-1 border-colorGoldSecundary-500 absolute top-0 left-[75%] hidden md:block"></div>
      </section>

      <section className="flex items-center mb-12">
        <div className="w-[170px] h-[0px] border-1 border-colorGoldSecundary-500 hidden sm:block"></div>
        <div className="flex flex-row items-center gap-x-[50px] border-1.5 border-colorGoldSecundary-500 p-5 rounded-full mx-auto ">
          {listSocialMediaOptions.map((item) => {
            const { name, icon, href } = item;
            return (
              <Link
                key={name}
                href={href}
                className=" cursor-pointer"
                target="_blank"
              >
                {icon}
              </Link>
            );
          })}
        </div>
        <div className="w-[170px] h-[0px] border-1 border-colorGoldSecundary-500 hidden sm:block"></div>
      </section>
      <section className="flex gap-2 text-center h-fit mb-12 px-1">
        <span className="text-neutral-950 text-[26px] md:text-[32px] font-medium">
          Tenes alguna duda
        </span>
        <span className=" text-colorGoldSecundary-500 text-[26px] md:text-[32px] font-medium">
          ?
        </span>
        <span className="text-neutral-950 text-[26px] md:text-[32px] font-medium">
          Envíanos un mensaje
        </span>
      </section>
      <FormContact />
    </section>
  );
}