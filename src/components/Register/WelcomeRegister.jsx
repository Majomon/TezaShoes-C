import SocialMediaThree from "../SocialMediaThree/SocialMediaThree";

function WelcomeRegister() {
  return (
    <div className="w-full h-full flex flex-col items-center py-4 gap-4">
      <img src="/LogoTeza.png" alt="Logo Teza" className="w-fit h-fit" />
      <h1 className="text-base sm:text-xl">
        Bienvenidos a Teza 😊
      </h1>
      <div className="w-[170px] h-[60px] px-2 flex justify-around items-center border-2 border-colorGoldSecundary-500 rounded-full ">
        <SocialMediaThree />
      </div>
    </div>
  );
}

export default WelcomeRegister;
