import { Headlines } from "../lib/types";

export default function HeadlineCard(props: Headlines) {
  const { title } = props;
  return <div>{title}</div>;
}
