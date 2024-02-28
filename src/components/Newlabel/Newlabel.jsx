import {
    NewLabelItem,
    OfferLabelItem,
  } from "../../../assets/NewlabelItem/NewLabelItem";
  
  export default function Newlabel({ newProduct, offer }) {
    let New = newProduct === true ? "block" : "hidden";
    return (
      <>
        {
          /*cambiar or por and despues*/
          newProduct === true && offer === false ? (
            <div
              className={` text-colorWhite-100 w-[54px] h-[54px] rounded-tr-sm rounded-br-sm flex justify-center items-center absolute z-[5] top-0  ${New}`}
            >
              <NewLabelItem />
              <p className="w-[45.36px] h-5 left-0 top-[12px] absolute -rotate-45 text-xs font-light">
                NUEVO
              </p>
            </div> /* : offer === true && newProduct === false ? <div className="absolute top-0 right-0 z-10">
                      <OfferLabelItem />
                      <p className="w-[45.36px] h-5 rotate-45 text-center text-white text-xs font-light absolute top-[11px] right-0">OFERTA</p>
                  </div> */
          ) : offer === true && newProduct === true ? (
            <div>
              {/* <div className={` text-colorWhite-100 w-[54px] h-[54px] rounded-tr-sm rounded-br-sm flex justify-center items-center absolute z-[5] top-0  ${New}`}>
                          <NewLabelItem />
                          <p className="w-[45.36px] h-5 left-0 top-[12px] absolute -rotate-45 text-xs font-light">NUEVO</p>
                      </div> */}
              <div className="absolute top-0 right-0 z-[5]">
                <OfferLabelItem />
                <p className="w-[45.36px] h-5 rotate-45 text-center text-white text-xs font-light absolute top-[11px] right-0 ">
                  OFERTA
                </p>
              </div>
            </div>
          ) : (
            ""
          )
        }
      </>
    );
  }
  