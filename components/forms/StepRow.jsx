import { verticalScale } from "@/utils/styling";
import { StyleSheet, View } from "react-native";
import { RemoveFieldBtn } from "../buttons";
import InputField from "./InputField";
const StepRow = ({ index, errors, control, removeFn, fieldsLength }) => {
  return (
    <View style={styles.row}>
      <InputField
        name={`steps.${index}.instruction`}
        type="text"
        label={`Step ${index + 1}`}
        control={control}
        error={errors.steps?.[index]?.instruction}
        placeholder={`Enter step ${index + 1} instructions here...`}
        hideError={true}
        style={{
          flex: 1,
          textAlignVertical: "top",
          minHeight: verticalScale(60),
        }}
        multiline={true}
        numberOfLines={3}
        maxLength={255}
      />
      {fieldsLength > 1 && (
        <RemoveFieldBtn
          removeFn={removeFn}
          index={index}
          //   labelPadding
          style={{ width: 30, alignItems: "center" }}>
          X
        </RemoveFieldBtn>
      )}
    </View>
  );
};

export default StepRow;

const styles = StyleSheet.create({
  container: { padding: 16 },
  textArea: {
    height: 80,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // marginBottom: 8,
    justifyContent: "space-between",
  },
  flex: { flex: 1 },
  remove: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 8,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 8,
  },
});
