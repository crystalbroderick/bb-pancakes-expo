import { spacingY } from "@/constants/theme";
import { StyleSheet } from "react-native";
import SafeScreen from "./SafeScreen";

const ModalWrapper = ({ style, bg, children }) => {
  return (
    <SafeScreen paddingHorizontal style={[styles.container, style]} bg={bg}>
      {children}
    </SafeScreen>
  );
};
export default ModalWrapper;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: spacingY._60,
  },
});
