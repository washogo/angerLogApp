"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(inputData);

  if (error) {
    console.error("ログインエラー:", error);
    throw new Error(translateError(error.message));
  }
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    name: formData.get("name") as string,
  };

  const { data, error } = await supabase.auth.signUp(inputData);

  if (error) {
    console.error("サインアップエラー:", error);
    throw new Error(translateError(error.message));
  }
  const userId = data.user?.id;
  if (userId) {
    const { error } = await supabase.from("User").insert([
      {
        id: userId,
        email: inputData.email,
        password: inputData.password,
        name: inputData.name,
      },
    ]);
    if (error) {
      console.error("サインアップカスタムユーザ登録エラー:", error);
      throw new Error(translateError(error.message));
    }
  }
}
export const checkAuth = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    toast.error(error?.message || "認証ユーザーが存在しませんでした。");
    redirect("/login");
  }

  return user;
};
const translateError = (errorMessage: string) => {
  const errorTranslations: { [index: string]: string } = {
    "email rate limit exceeded":
      "メールの送信制限を超えました。しばらく待ってから再試行してください。",
    email_not_confirmed:
      "メールアドレスが確認されていません。確認メールをチェックしてください。",
    "Email not confirmed":
      "メールアドレスが確認されていません。確認メールをチェックしてください。",
    over_email_send_rate_limit:
      "メールの送信制限を超えました。しばらく待ってから再試行してください。",
    email_already_in_use: "このメールアドレスはすでに使用されています。",
    invalid_email: "メールアドレスが無効です。正しい形式を使用してください。",
    "missing email or phone": "ログインに必要な項目が入力されていません。",
    "Anonymous sign-ins are disabled": "ログインに失敗しました。",
    "User already registered": "このユーザーは既に登録されています。",
    "Invalid login credentials": "ログイン情報が誤っています。",
    "Password should be at least 6 characters.":
      "パスワードは6文字以上である必要があります。",
    validation_failed: "入力内容の検証に失敗しました。",
  };

  if (errorMessage in errorTranslations) {
    return errorTranslations[errorMessage];
  }
  return errorMessage;
};
