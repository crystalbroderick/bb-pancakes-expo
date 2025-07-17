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
  hideError = false,
  ...props
}) => {
  const { theme, isLightTheme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={[styles.container, style]}>
          {label || (error && !hideError) ? (
            <Text
              style={[
                FONTS.label,
                { color: textColor ?? theme.text, paddingVertical: 3 },
              ]}>
              {label}{" "}
              {error && !hideError && (
                <Text style={[FONTS.labelSemi, { color: theme.danger }]}>
                  {error.message}
                </Text>
              )}
            </Text>
          ) : null}

          <View
            style={[
              styles.inputWrapper,
              {
                color: textColor ?? theme.text,
                borderColor: error
                  ? theme.danger
                  : isFocused
                  ? theme.accent
                  : theme.primary,
                backgroundColor: readOnly
                  ? COLORS.gray
                  : !isLightTheme || useDarkBackground
                  ? COLORS.darkGray
                  : theme.lightGray,
              },
            ]}>
            {/* {error && <Text style={styles.error}>{error.message}</Text>} */}

            <TextInput
              style={[
                styles.input,
                style,
                { color: readOnly ? "#ffffff" : textColor ?? theme.text },
              ]}
              onFocus={() => setIsFocused(true)}
              placeholder={placeholder}
              placeholderTextColor={theme.gray}
              onBlur={(e) => {
                setIsFocused(false);
                onBlur?.(e);
              }}
              onChangeText={(text) => {
                const parsed = keyboardType === "numeric" ? Number(text) : text;
                onChange(parsed);
              }}
              value={value}
              editable={!readOnly}
              keyboardType={keyboardType}
              secureTextEntry={secureTextEntry}
              {...props}
            />
            {icon}
          </View>
        </View>
      )}
    />
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
    elevation: 3,
    shadowColor: "black",
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
  },
  readOnly: {
    backgroundColor: "#eee",
  },
});
