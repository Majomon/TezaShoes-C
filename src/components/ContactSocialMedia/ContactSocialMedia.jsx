export default function ContactSocialMedia({image,title,subTitle}) {
  return (
    <article className="flex flex-col gap-y-[10px] items-center">
      <div>{image}</div>
      <h1 className="text-neutral-950 text-base font-bold">{title}</h1>
      <p className="text-neutral-950 text-base font-ligh">{subTitle}</p>
    </article>
  );
}
