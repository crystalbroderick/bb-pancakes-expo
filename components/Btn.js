import { COLORS, FONTS, SPACING } from '@/constants/theme';
import { Text, TouchableOpacity } from 'react-native';
const Btn = ({ title, onPress, style, textStyle, ...rest }) => {

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: COLORS.primary,
          padding: SPACING.md,
          borderRadius: SPACING.lg,
          alignItems: 'center',
        },
        style,
      ]}
      onPress={onPress}
      {...rest}
    >
      <Text style={[{ color: COLORS.onPrimary}, FONTS.buttonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default Btn;