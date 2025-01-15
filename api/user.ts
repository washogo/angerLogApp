"use server";

import { createClient } from "@/utils/supabase/server";
import { checkAuth } from "./auth";


type UserProfile = {
  name: string;
  email: string;
  password: string;
  goal: string;
};



export async function selectUser(): Promise<UserProfile> {
  const supabase = await createClient();
  const user = await checkAuth();

  const { data, error } = await supabase
    .from("User")
    .select("name, email, password, goal")
    .eq("id", user.id)
    .single();
  if (error) throw error;
  return data;
}

type updatesUserProps = {
  name: string;
  email: string;
  password?: string;
  goal: string;
};

export async function updateUser(updates: updatesUserProps) {
  const supabase = await createClient();
  const user = await checkAuth();
  const { data, error } = await supabase
    .from("User").update(updates).eq("id", user.id);
  if (error) throw error;
  return data;
}
