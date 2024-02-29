import UserIdMain from "@/components/UsersId/UsersIdMain";

async function getFetchUserId({ id }) {
  const res = await fetch(`${process.env.URL_BASE_DEV}/users/${id}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data;
}

export default async function UserId({ params }) {
  const userId = await getFetchUserId(params);

  return (
    <div className=" min-h-screen w-full">
      <UserIdMain userId={userId} />
    </div>
  );
}
