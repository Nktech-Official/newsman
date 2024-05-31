import axios from "axios";
import { useEffect, useState } from "react";
import { Headlines } from "./lib/types";
import HeadlineCard from "./components/HeadlineCard";

export default function App() {
  const [headlines, setHeadlines] = useState<Headlines[]>();
  useEffect(() => {
    axios
      .get("/api/headlines")
      .then((res) => {
        setHeadlines(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Headlines</h1>
      {headlines &&
        headlines.map((headline, index) => {
          return <HeadlineCard key={index} {...headline} />;
        })}
    </div>
  );
}
