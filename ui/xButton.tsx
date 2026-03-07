import { TouchableOpacity, Text } from "react-native";

export type ButtonProps = {
  text: string;
  onPress: () => void;
  colour: "black" | "grey" | "red" | "blue" | "yellow" | "pink";
  size: "s" | "m" | "l";
};

export function Xbutton(props: ButtonProps) {
  let padding = 0;
  let textSize = 0;

  if (props.size == "s") {
    padding = 8;
    textSize = 15;
  } else if (props.size == "m") {
    padding = 20;
    textSize = 30;
  } else if (props.size == "l") {
    padding = 50;
    textSize = 50;
  }

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        backgroundColor: props.colour,
        padding: padding,
        borderRadius: 45,
        margin: 10,
        opacity: 0.8,
        borderWidth: 1,
        borderColor: "white",
        left: 100,
        bottom: 50,
        marginTop: 0
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: textSize,
          textAlign: "center",
          opacity: 5,
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}
