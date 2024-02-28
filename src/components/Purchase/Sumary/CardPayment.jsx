export default function CardPayment({title}){

    let newDescrip = title !== "Transferencia Bancaria/Mercado pago" ? "Inmediato y 3 cuotas sin interes" : "Banco - Mercado pago"

    return (
        <div className="h-fit w-full shadow-cardPurchaseShadow p-[10px] rounded-lg">
            <h4 className="font-bold text-base">{title}</h4>
            <p className=" font-normal">{newDescrip}</p>
        </div>
    )
}