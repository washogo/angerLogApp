"use server";

import { createClient } from "@/utils/supabase/server";
import { checkAuth } from "./user";

type WorkContent = {
  id: number;
  userId: string;
  content: string;
  category: string;
};

export async function selectUserTaskAll(): Promise<WorkContent[]> {
  const supabase = await createClient();
  const user = await checkAuth();
  const { data, error } = await supabase
    .from("WorkContent")
    .select("id,userId,content ,category")
    .eq("userId", user.id);
  if (error) throw error;
  return data;
}

export async function selectTaskDetail(
  taskId: number
): Promise<WorkContent[]> {
  const supabase = await createClient();
  const user = await checkAuth();
  const { data, error } = await supabase
    .from("WorkContent")
    .select("id,userId,content ,category")
    .eq("userId", user.id)
    .eq("id", taskId);
  if (error) throw error;
  return data;
}

export const validateTaskCombination = async (
  category: string,
  content: string
) => {
  const supabase = await createClient();
  const user = await checkAuth();
  const { data, error } = await supabase
    .from("WorkContent")
    .select("*")
    .eq("userId", user.id)
    .eq("category", category)
    .eq("content", content);

  if (error) {
    console.error("作業内容重複データ検索", error);
    throw error;
  }

  return data && data.length > 0;
};

export const createTask = async (task: {
  category: string;
  content: string;
}) => {
  const supabase = await createClient();
  const user = await checkAuth();
  const inputData = { ...task, userId: user.id };

  const { data, error } = await supabase.from("WorkContent").insert(inputData);
  if (error) throw error;
  return data;
};

export const updateTask = async (
  taskId: number,
  updates: {
    category?: string;
    content?: string;
  }
) => {
  const supabase = await createClient();
  const user = await checkAuth();
  const { data, error } = await supabase
    .from("WorkContent")
    .update(updates)
    .eq("userId", user.id)
    .eq("id", taskId);
  if (error) throw error;
  return data;
};

export const deleteTask = async (taskId: number) => {
  const supabase = await createClient();
  await checkAuth();
  const { data, error } = await supabase
    .from("WorkContent")
    .delete()
    .eq("id", taskId);
  if (error) throw error;
  return data;
};
