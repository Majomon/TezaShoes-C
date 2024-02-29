import { Link } from "@nextui-org/react"
import { IconPageRouting } from "../../../assets/PageRouting/IconPageRouting"

export default function PageRouting({currentRuat}){
    return(
        <section className="flex flex-row gap-x-[10px] text-colorWhite-100 font-ligth">
            <Link href="/" className="text-colorWhite-100">Inicio</Link>
            <IconPageRouting />
            <p className=" font-light">{currentRuat}</p>
        </section>
    )
}