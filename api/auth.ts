"use server";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const inputData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(inputData);

  if (error) {
    throw error;
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
    throw error;
  }
  const userId = data.user?.id;
  console.log(userId);
  console.log(data);
  console.log(data.user);
  if (userId) {
    const { data, error } = await supabase.from("User").insert([
      {
        id: userId,
        email: inputData.email,
        password: inputData.password,
        name: inputData.name,
      },
    ]);
    if (error) {
      throw error;
    }
  }
}
