import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

interface Props {
  color?: string;
  focused: boolean;
}

const FridgeSmall = (props: Props) => (
  <Svg {...props} width={19} height={30} fill="none">
    <Path stroke={props.color} strokeLinecap="round" strokeWidth={3} d="M13 14v4" />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M3 21.5V3h13v18.5H3Zm0 3V27h13v-2.5H3ZM0 2a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2Z"
      clipRule="evenodd"
    />
    <Circle cx={11.5} cy={6.5} r={1.5} fill={props.color} />
    <Circle cx={7.5} cy={6.5} r={1.5} fill={props.color} />
    <Circle cx={7.5} cy={6.5} r={1.5} fill={props.color} />
  </Svg>
);

const FridgeLarge = (props: Props) => (
  <Svg {...props} width={26} height={46} fill="none">
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M5 3h16a2 2 0 0 1 2 2v31.5H3V5a2 2 0 0 1 2-2ZM0 38V5a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v36a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5v-3Zm23 1.5V41a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5h20Z"
      clipRule="evenodd"
    />
    <Path stroke={props.color} fill={props.color} strokeLinecap="round" strokeWidth={3} d="M20 18v11" />
    <Circle cx={10.5} cy={7.5} r={1.5} fill={props.color} />
    <Circle cx={15.5} cy={7.5} r={1.5} fill={props.color} />
  </Svg>
);

export { FridgeSmall, FridgeLarge };
