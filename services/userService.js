import { supabase } from "@/utils/supabase";

export const getUserProfile = async (sessionUser) => {
  const { id, email, user_metadata } = sessionUser;

  const {
    data: profileData,
    error,
    status,
  } = await supabase
    .from("profiles")
    .select("display_name, avatar_url")
    .eq("id", id)
    .single();

  if (error && status !== 406) throw error;

  return {
    id,
    email,
    metadata: user_metadata,
    ...profileData,
  };
};

export const updateUserProfile = async (updates) => {
  const { error } = await supabase.from("profiles").upsert({
    ...updates,
    updated_at: new Date(),
  });
  if (error) throw error;
};
