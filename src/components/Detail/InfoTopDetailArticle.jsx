import { useStoreProducts } from "@/zustand/store";
import { Card, Skeleton } from "@nextui-org/react";

export default function InfoTopDetailArticle() {
  const { detail } = useStoreProducts();

  return (
    <div className="flex flex-col justify-center items-center max-w-[370px] mx-auto lg:m-0 ">
      {!detail.name ? (
        <Card className="w-[140px] h-full p-2 my-2" radius="lg">
          <Skeleton className="w-full rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
        </Card>
      ) : (
        <section className=" flex gap-x-[10px] items-center justify-center relative h-[80px] w-[305px] xl:w-full ">
          <h2 className="text-lg font-light text-center text-colorBlack-400">
            {detail.category}
          </h2>
          <h2 className="text-lg font-bold text-center text-colorBlack-400">
            {detail.name}
          </h2>
          <h3 className=" absolute top-0 left-0 opacity-5 text-center text-colorBlack-400 text-8xl font-bold tracking-[10.52px] xl:block xl:tracking-[35.52px] ">
            TEZA
          </h3>
        </section>
      )}
    </div>
  );
}
