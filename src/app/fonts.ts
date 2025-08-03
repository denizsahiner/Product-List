import LocalFont from "next/font/local";

export const MontserratRegular = LocalFont({
  src: [
    {
      path: "../../public/fonts/montserat/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-montserrat-regular",
});
export const AvenirBook = LocalFont({
  src: [
    {
      path: "../../public/fonts/avenir/Avenir-Book.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-avenir-book",
});
export const MontserratMedium = LocalFont({
  src: [
    {
      path: "../../public/fonts/montserat/Montserrat-Medium.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-montserrat-medium",
});
