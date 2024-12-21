"use server";

import { createClient } from "@/utils/supabase/server";
type UserProfile = {
  name: string;
  email: string;
  password: string;
  goal: string;
};

type SupabaseUserResponse = {
  data: UserProfile | null;
  error: any;
};

export async function getUser() {
  const supabase = await createClient();

  return await supabase.auth.getUser();
}

export async function selectUser(): Promise<SupabaseUserResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      data: null,
      error: authError || new Error("認証ユーザーが存在しません"),
    };
  }
  return await supabase
    .from("User")
    .select("name, email, password, goal")
    .eq("id", user.id)
    .single();
}

type updatesUserProps = {
  name: string;
  email: string;
  password?: string;
  goal: string;
};

export async function updateUser(updates: updatesUserProps) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      data: null,
      error: authError || new Error("認証ユーザーが存在しません"),
    };
  }
  return await supabase.from("User").update(updates).eq("id", user.id);
}
