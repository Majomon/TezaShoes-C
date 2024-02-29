export default function ShowSizeStock({ size, stock }) {
  return (
    <div>
      {size !== "" && stock !== "" ? (
        <p className=" text-sm font-normal">
          {size} ({stock})
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
