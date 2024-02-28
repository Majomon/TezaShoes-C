export default function Title({text}){
    return(
        <div className="relative mx-auto w-fit mt-8">
            <h1 className="text-center text-black text-[24px] md:text-[32px] font-bold uppercase">{text}</h1>
            <p className=" absolute top-1.5 opacity-25 left-0 text-colorGray-100 text-center text-[24px] md:text-[32px] font-bold uppercase -z-10">{text}</p>
        </div>
    )
} 