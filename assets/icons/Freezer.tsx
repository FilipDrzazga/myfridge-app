import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  color?: string;
}

const FrezzerSmall = (props: Props) => (
  <Svg width={18} height={29} fill="none" {...props}>
    <Circle cx={8} cy={6} r={1} fill={props.color} />
    <Circle cx={12} cy={6} r={1} fill={props.color} />
    <Path stroke={props.color} strokeLinecap="round" strokeWidth={2} d="M13 12v6" />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M2 3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v23a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-8h2v5h12V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9H2V3Zm14 22H4v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1Z"
      clipRule="evenodd"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M3 13.5v3M1.94 13.94l2.12 2.12M4.06 13.94l-2.12 2.12M4.5 15h-3"
    />
  </Svg>
);

const FrezzerLarge = (props: Props) => (
  <Svg {...props} width={32} height={46} fill="none">
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={3}
      d="M26 18v11M7.5 18v11M3.61 19.61l7.779 7.78M11.39 19.61 3.61 27.39M13 23.5H2"
    />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M27 3H11a2 2 0 0 0-2 2v11H6V5a5 5 0 0 1 5-5h16a5 5 0 0 1 5 5v36a5 5 0 0 1-5 5H11a5 5 0 0 1-5-5V31h3v5.5h20V5a2 2 0 0 0-2-2Zm2 38v-1.5H9V41a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z"
      clipRule="evenodd"
    />
    <Circle cx={16.5} cy={7.5} r={1.5} fill={props.color} />
    <Circle cx={21.5} cy={7.5} r={1.5} fill={props.color} />
  </Svg>
);
export { FrezzerSmall, FrezzerLarge };
