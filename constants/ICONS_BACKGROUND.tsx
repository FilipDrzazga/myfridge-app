import GlobalStyle from "../style/GlobalStyle";

const ICON_COLOR = GlobalStyle.colors.black;
const ICON_SIZE = 60;

type ICONS = {
  name: "beer-outline" | "beer" | "pizza" | "pizza-outline" | "fast-food-outline" | "fast-food";
  size: number;
  color: string;
};

const ICONS_BACKGROUND: ICONS[] = [
  { name: "beer-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "pizza", size: ICON_SIZE, color: ICON_COLOR },
  { name: "fast-food-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "fast-food", size: ICON_SIZE, color: ICON_COLOR },
  { name: "pizza-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "beer", size: ICON_SIZE, color: ICON_COLOR },
  { name: "fast-food-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "beer-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "pizza", size: ICON_SIZE, color: ICON_COLOR },
  { name: "fast-food", size: ICON_SIZE, color: ICON_COLOR },
  { name: "pizza-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "fast-food", size: ICON_SIZE, color: ICON_COLOR },
  { name: "beer-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "pizza", size: ICON_SIZE, color: ICON_COLOR },
  { name: "beer", size: ICON_SIZE, color: ICON_COLOR },
  { name: "pizza-outline", size: ICON_SIZE, color: ICON_COLOR },
  { name: "beer", size: ICON_SIZE, color: ICON_COLOR },
  { name: "fast-food-outline", size: ICON_SIZE, color: ICON_COLOR },
];

export default ICONS_BACKGROUND;
