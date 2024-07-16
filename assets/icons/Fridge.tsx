import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

interface Props {
  color?: string;
  focused?: boolean;
}

const FridgeSmall = (props: Props) => (
  <Svg width={16} height={29} fill="none" {...props}>
    <Circle cx={6} cy={6} r={1} fill={props.color} />
    <Circle cx={10} cy={6} r={1} fill={props.color} />
    <Path stroke={props.color} strokeLinecap="round" strokeWidth={2} d="M11 12v6" />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M3 0a3 3 0 0 0-3 3v23a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3ZM2 18v5h12V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v15Zm0 7h12v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1Z"
      clipRule="evenodd"
    />
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
