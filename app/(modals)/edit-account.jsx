import { Btn } from "@/components/buttons";
import { COLORS, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { verticalScale } from "@/utils/styling";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Avatar from "../../components/common/Avatar";
import Header from "../../components/common/Header";
import Loading from "../../components/common/Loading";
import InputField from "../../components/forms/InputField";
import ModalWrapper from "../../components/ModalWrapper";
import { uploadFile } from "../../services/imageService";
export default function EditAccountScreen() {
  const { toggleTheme, isLightTheme, theme } = useTheme();
  const router = useRouter();
  const { user, updateUser, updateProfile, loading } = useAuth();
  const [localAvatarUri, setLocalAvatarUri] = useState(null);

  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      display_name: "",
      avatar_url: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        display_name: user.display_name || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setLocalAvatarUri(result.assets[0].uri);
    }
  };

  const isFormDirty = () => {
    return user.display_name !== watch("display_name") || !!localAvatarUri;
  };

  const onSubmit = async (data) => {
    let avatarUrl = user.avatar_url;

    // Upload image
    if (localAvatarUri) {
      const avatarRes = await uploadFile("profiles", localAvatarUri);
      if (avatarRes.success) {
        avatarUrl = avatarRes.data;
      } else {
        console.log("Avatar upload failed");
        return;
      }
    }

    // Update both display name and avatar_url
    const res = await updateProfile({
      display_name: data.display_name || user.display_name,
      avatar_url: avatarUrl,
    });

    if (res.success) {
      router.back();
    }
  };

  let imageSource = localAvatarUri || user.avatar_url;
  return (
    <ModalWrapper bg={theme.background}>
      <Header title="Update Account" showBackButton></Header>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View>
            <Avatar edit size={135} uri={imageSource} />

            <TouchableOpacity
              style={styles.editIcon}
              onPress={pickImage}
              disabled={loading}>
              <MaterialIcons
                name="edit"
                size={24}
                color={COLORS.onPrimary}></MaterialIcons>
            </TouchableOpacity>
          </View>
        </View>
        <InputField
          control={control}
          name="display_name"
          label="Display Name"
          placeholder=""
        />
        {loading ? (
          <Loading
            loading={loading}
            contentStyle={{ flex: 0 }}
            loadingStyle={{ flex: 0 }}
            success=""
          />
        ) : (
          <Btn
            title={loading ? "Saving Changes..." : "Save changes"}
            onPress={handleSubmit(onSubmit)}
            disabled={!isFormDirty()}
          />
        )}
      </ScrollView>
    </ModalWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingY._20,
  },
  success: {
    paddingVertical: spacingX._40,
    fontWeight: "bold",
  },
  avatar: {
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: COLORS.yellow,
    shadowColor: "#000",
    elevation: 10,
    padding: 4,
  },
});
