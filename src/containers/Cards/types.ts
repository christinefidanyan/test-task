export type TCardsProps = {
  data:TData[]
}

export type TData = {
  title: string;
  text: string;
  tags: string;
  autor: string;
  img: string;
  img_2x: string;
  date: string;
  views: string;
}

export type TSelectedCardInfo ={
  title:string;
  description:string
}