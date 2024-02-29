import Link from "next/link";
import { IconFacebookContact, IconInstgramContact, IconWhatsappContact } from "../../../assets/PageContact/IconsPageContacts";

const listSocialMedia = [
  {
    name: "Facebook",
    url: "https://www.facebook.com/",
    icon: <IconFacebookContact />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/",
    icon: <IconInstgramContact />,
  },
  {
    name: "Whatsapp",
    url: "https://api.whatsapp.com/send/?phone=541159728345",
    icon: <IconWhatsappContact />,
  },
];

export default function SocialMediaThree() {
  return listSocialMedia.map((item) => {
    const { name, url, icon } = item;
    return (
      <Link key={name} href={url} target="_blank" className=" cursor-pointer">
        {icon}
      </Link>
    );
  });
}
