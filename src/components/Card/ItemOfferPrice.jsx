export default function ItemOfferPrice({offerPrice}){
    return(
        <div className="h-fit w-fit rounded-[5px] px-[5px] py-[2.5px] bg-gradient-to-r from-red-400 via-red-500 to-red-600 from-5% via-30% to-60%">
            <p className=" text-colorWhite-100 text-[14px]">${offerPrice}</p>
        </div>
    )
}