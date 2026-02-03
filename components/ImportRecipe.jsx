// components/ImportRecipeBottomSheet.jsx
import BottomSheet from "@gorhom/bottom-sheet";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { Button, TextInput, View } from "react-native";

const ImportRecipeBottomSheet = forwardRef(({ onImportSuccess }, ref) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["60%", "90%"], []);

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRef.current?.snapToIndex(0),
    close: () => bottomSheetRef.current?.close(),
  }));
  console.log("bottom");
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose>
      <View style={{ padding: 20 }}>
        <TextInput placeholder="Paste recipe URL" />
        <Button title="Import" onPress={onImportSuccess} />
      </View>
    </BottomSheet>
  );
});

export default ImportRecipeBottomSheet;
