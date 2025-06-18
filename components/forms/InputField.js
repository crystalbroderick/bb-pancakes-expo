import { COLORS, FONTS } from "@/constants/theme";
import { useTheme } from "@/context/ThemeContext";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
const InputField = ({
  control,
  name,
  label = "",
  placeholder = "",
  keyboardType = "default",
  rules = {},
  defaultValue = "",
  readOnly = false,
  style = {},
  textColor = undefined,
  useDarkBackground = false,
  type = "text",
  icon,
  secureTextEntry = false,
}) => {
  const { theme, isLightMode } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <Text style={[FONTS.label, { color: textColor ?? theme.text, paddingVertical: 3 }]}>
          {label}
        </Text>
      ) : null}

      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View
            style={[
              styles.inputWrapper,
              {
                color: textColor ?? theme.text,
                borderColor: error ? "red" : isFocused ? theme.accent : theme.primary,
                backgroundColor:
                  !isLightMode || useDarkBackground
                    ? COLORS.darkGray
                    : theme.background,
              },
            ]}>
            <TextInput
              style={[
                styles.input,
                { color: textColor ?? theme.text },
                readOnly && styles.readOnly,
              ]}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              placeholderTextColor={theme.text}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              onChangeText={onChange}
              value={value}
              editable={!readOnly}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
            />
            {icon}
            {error && <Text style={styles.error}>{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    flex: 1,
    outlineStyle: "none",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
  readOnly: {
    backgroundColor: "#eee",
  },
});
