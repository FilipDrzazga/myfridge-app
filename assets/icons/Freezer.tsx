import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

interface Props {
  color?: string;
}

const FrezzerSmall = (props: Props) => (
  <Svg {...props} width={21} height={30} fill="none">
    <Path stroke={props.color} strokeLinecap="round" strokeWidth={3} d="M15 14v4" />
    <Circle cx={13.5} cy={6.5} r={1.5} fill={props.color} />
    <Circle cx={9.5} cy={6.5} r={1.5} fill={props.color} />
    <Circle cx={9.5} cy={6.5} r={1.5} fill={props.color} />
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M5 21v.5h13V3H5v9H2V2a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7h3Zm0 6v-2.5h13V27H5Z"
      clipRule="evenodd"
    />
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeWidth={2}
      d="M3.5 18.5V14M5.091 17.841 1.91 14.659M1.909 17.841l3.182-3.182M1.25 16.25h4.5"
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
