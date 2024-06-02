export interface Headlines {
  index: number;
  title: string;
  sourceName: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
}

export type ApiNewsCountry =
  | "ae"
  | "ar"
  | "at"
  | "au"
  | "be"
  | "bg"
  | "br"
  | "ca"
  | "ch"
  | "cn"
  | "co"
  | "cu"
  | "cz"
  | "de"
  | "eg"
  | "fr"
  | "gb"
  | "gr"
  | "hk"
  | "hu"
  | "id"
  | "ie"
  | "il"
  | "in"
  | "it"
  | "jp"
  | "kr"
  | "lt"
  | "lv"
  | "ma"
  | "mx"
  | "my"
  | "ng"
  | "nl"
  | "no"
  | "nz"
  | "ph"
  | "pl"
  | "pt"
  | "ro"
  | "rs"
  | "ru"
  | "sa"
  | "se"
  | "sg"
  | "si"
  | "sk"
  | "th"
  | "tr"
  | "tw"
  | "ua"
  | "us"
  | "ve"
  | "za";

export type country = {
  name: string;
  code: ApiNewsCountry;
};
