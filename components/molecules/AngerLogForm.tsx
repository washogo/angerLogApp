"use client";
import React from "react";
import InputField from "../atoms/Input";
import SelectField from "../atoms/SelectField";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const AngerLogForm: React.FC<{ mode: "new" | "edit" }> = ({ mode }) => {
  const isEdit = mode === "edit";
  const router = useRouter();

  const handleSubmit = () => {
    console.log("アンガーログ登録成功");
    router.push(`/dashboard`);
    router.refresh();
  };
  const handleUpdate = () => {
    console.log("アンガーログ更新成功");
    router.push(`/dashboard`);
    router.refresh();
  };
  const handleDelete = () => {
    console.log("アンガーログ削除成功");
    router.push(`/dashboard`);
    router.refresh();
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <SelectField
        label="怒りレベル (レベル10 人生最大)"
        name="angerLevel"
        value="5"
        onChange={() => {}}
        options={[
          { value: "1", label: "😞 レベル1" },
          { value: "2", label: "😖 レベル2" },
          { value: "3", label: "😩 レベル3" },
          { value: "4", label: "😭 レベル4" },
          { value: "5", label: "😤 レベル5" },
          { value: "6", label: "😡 レベル6" },
          { value: "7", label: "🤬 レベル7" },
          { value: "8", label: "👿 レベル8" },
          { value: "9", label: "😱 レベル9" },
          { value: "10", label: "💀 レベル10" },
        ]}
      />
      <SelectField
        label="カテゴリ"
        name="category"
        value="仕事"
        onChange={() => {}}
        options={[
          { value: "仕事", label: "仕事" },
          { value: "家庭", label: "家庭" },
        ]}
      />
      <SelectField
        label="なにしてた？"
        name="activity"
        value="接客"
        onChange={() => {}}
        options={[
          { value: "接客", label: "接客" },
          { value: "電話", label: "電話" },
        ]}
      />
      <InputField
        type="date"
        label="いつ？"
        name="date"
        value="2024-12-03"
        onChange={() => {}}
      />
      <InputField type="time" label="何時くらい？" name="time" value="14:00" />
      <InputField type="text" label="どんな状況？" name="" />
      <InputField type="text" label="どんな気持ちになった？" name="" />

      {!isEdit ? (
        <Button variant="contained" color="success" onClick={handleSubmit}>
          登録
        </Button>
      ) : (
        <>
          <Button variant="contained" color="success" onClick={handleUpdate}>
            更新
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            削除
          </Button>
        </>
      )}
    </Box>
  );
};

export default AngerLogForm;
