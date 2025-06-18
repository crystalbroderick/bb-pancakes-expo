import { useTheme } from '@/context/ThemeContext';
import { Text } from 'react-native';

const ThemedText = (props) => {
  const { theme } = useTheme();

  return (
    <Text {...props} style={[props.style, { color: theme.text }]}>{props.children}</Text>
  );
};

export default ThemedText;