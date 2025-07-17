import { spacingY } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { RemoveFieldBtn } from "../buttons";
import InputField from "./InputField";
const IngredientRow = ({ index, errors, control, removeFn, fieldsLength }) => {
  return (
    <View style={styles.row}>
      <InputField
        name={`ingredients.${index}.name`}
        type="text"
        label={index === 0 ? "Name" : ""}
        control={control}
        error={errors.ingredients?.[index]?.name}
        placeholder="e.g., Sugar"
        style={{ width: "50%", marginBottom: spacingY._05 }}
        hideError={true}
      />
      <InputField
        name={`ingredients.${index}.quantity`}
        type="text"
        label={index === 0 ? "Quantity" : ""}
        control={control}
        error={errors.ingredients?.[index]?.quantity}
        placeholder="e.g., 1 cup"
        style={{ flex: 1, marginBottom: spacingY._05 }}
        hideError={true}
      />
      {fieldsLength > 1 && (
        <RemoveFieldBtn
          labelPadding={index === 0}
          removeFn={removeFn}
          index={index}
          style={{ width: 30, alignItems: "center" }}>
          X
        </RemoveFieldBtn>
      )}
    </View>
  );
};

export default IngredientRow;

const styles = StyleSheet.create({
  textArea: {
    height: 80,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
    justifyContent: "space-between",
  },
  remove: {
    color: "red",
    fontWeight: "bold",
    fontSize: 16,
    paddingHorizontal: 8,
  },
});
