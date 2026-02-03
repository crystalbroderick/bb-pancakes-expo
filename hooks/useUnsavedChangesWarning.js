// useUnsavedChangesWarning.js
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

export default function useUnsavedChangesWarning(hasUnsavedChanges) {
  const router = useRouter();

  useEffect(() => {
    if (!router?.events) return;

    const beforeRemove = (event) => {
      if (!hasUnsavedChanges) return;

      event.preventDefault();

      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure you want to leave and lose them?",
        [
          { text: "Stay", style: "cancel" },
          {
            text: "Leave",
            style: "destructive",
            onPress: () => {
              router.events.removeListener("beforeRemove", beforeRemove);
              router.back();
            },
          },
        ]
      );
    };

    router.events.addListener("beforeRemove", beforeRemove);

    return () => {
      router.events.removeListener("beforeRemove", beforeRemove);
    };
  }, [hasUnsavedChanges, router]);
}
