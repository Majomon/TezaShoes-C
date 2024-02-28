import { Image } from "@nextui-org/react";

export default function ItemModal({name, category, image, colorName, size, price, count, totalPrice}){
    return (
        <div className="w-full h-[120px] flex justify-between items-center py-3 border-b-1 border-zinc-200">
            <section className="flex gap-x-3">
                <Image src={image} className=" rounded-md w-[60px]  object-contain"/>
                <article className="h-full max-w-[170px] ">
                    <h5 className="font-bold text-colorBlack-400 uppercase">{name}</h5>
                    <p className="text-stone-300 font-normal">{category}</p>
                    <div className="flex w-full justify-between items-center gap-x-2">
                        <p className="w-full text-sm">{colorName}</p>
                        <p>{size}</p>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <p className=" text-colorBlack-400 font-semibold">${price}</p>
                        <p className="text-stone-300 font-normal">x{count}</p>
                    </div>
                </article>
            </section>
            <section>

            </section>
            <section className=" h-full flex flex-col justify-end">
                <h4 className=" font-semibold">${totalPrice}</h4>
            </section>
        </div>
    )
}