import { Headlines } from "../lib/types";
import datetime from "moment";
// export default function HeadlineCard(props: Headlines) {
//   const { title, description, sourceName, url, urlToImage, publishedAt } =
//     props;
//   return (
//     <div className="container border bg-slate-600 h-60 flex justify-center items-center m-auto">
//       <div className="flex justify-around ">
//         <div>
//           <a className="font-bold text-2xl" href={url}>
//             <h1>{title}</h1>
//           </a>
//           <p>{description}</p>
//           <div>
//             <p>{sourceName}</p>
//             <p>{publishedAt}</p>
//           </div>
//         </div>
//         <div className="">
//           <img
//             width={200}
//             height={90}
//             className="w-[200] my-1 px-2 rounded-lg"
//             src={urlToImage ? urlToImage : "/no-news.jpeg"}
//             alt=""
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

export default function HeadlineCard(props: Headlines) {
  const { title, description, sourceName, url, urlToImage, publishedAt } =
    props;
  const parsedTime = datetime.utc(publishedAt);
  const date = parsedTime.format("YYYY-MM-DD");
  const time = parsedTime.format("HH:mm:ss");

  return (
    <div className="my-2 w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage: `url('${
            urlToImage ? urlToImage : "/no-news.jpeg"
          }')`,
        }}
        title="Woman holding a mug"
      ></div>
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-black hover:opacity-60 opacity-100 hover:underline underline-offset-4 font-bold text-xl mb-2">
            {" "}
            <a href={url} target="_blank">
              {title}
            </a>
          </div>
          <div className="flex items-center w-full">
            <div className="text-sm flex w-full  font-bold items-center justify-between">
              <p className="text-black underline-offset-2 underline leading-none">
                {sourceName}
              </p>
              <p className="text-grey-dark">
                PUBLISHED: {date} {time}
              </p>
            </div>
          </div>
          <p className="text-grey-darker text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}
