import { Text, View } from "react-native";
import { COLORS } from "../constants/colors";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <Text style={{color:COLORS.text}}>Edit  this screen.</Text>
    </View>
  );
}
