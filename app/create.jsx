import SafeScreen from "@/components/SafeScreen";
import ThemedText from "@/components/ThemedText";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from 'react-native';
const CreateScreen = () => {
  const router = useRouter();
const {theme} = useTheme()
  return (
    <SafeScreen>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}
      >
        <Ionicons name="return-up-back" size={24} color={theme.text} />
        <ThemedText style={{ marginLeft: 5 }}>Back</ThemedText>
      </TouchableOpacity>

      {/* Rest of your content */}
      <Text style={{ fontSize: 24, marginTop: 20 }}>Create something!</Text>
    </SafeScreen>
  )
}

export default CreateScreen