import MainClient from "@/components/MainClient/MainClient";

function ListClients() {
  return (
    <div className="w-full p-6">
      <div className=" w-full max-w-[960px] mx-auto flex flex-col gap-y-2">
        <h1 className=" text-base font-bold">Clientes</h1>
        <MainClient />
      </div>
    </div>
  );
}

export default ListClients;
