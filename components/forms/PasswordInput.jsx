import { COLORS } from "@/constants/theme";
import Octicons from "@expo/vector-icons/Octicons";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import InputField from "./InputField";
const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <InputField
      {...props}
      secureTextEntry={!showPassword}
      icon={
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Octicons name="eye" size={24} color={props.textColor} />
          ) : (
            <Octicons
              name="eye-closed"
              size={24}
              color={props.textColor ?? COLORS.secondary}
            />
          )}
        </TouchableOpacity>
      }
    />
  );
};

export default PasswordInput;
