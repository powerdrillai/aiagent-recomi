import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: false,

  initialize: async () => {
    try {
      // const {
      //   data: { session },
      // } = await supabase.auth.getSession();
      // if (session?.user) {
      //   const { data: profile } = await supabase
      //     .from("profiles")
      //     .select("*")
      //     .eq("id", session.user.id)
      //     .single();
      //   set({
      //     user: session.user,
      //     profile,
      //     isAuthenticated: true,
      //     isLoading: false,
      //   });
      // } else {
      //   set({ isLoading: false });
      // }
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ isLoading: false });
    }
  },

  login: async ({ email, password }) => {
    // const {
    //   data: { user, session },
    //   error,
    // } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error) throw error;
    // // const { data: profile } = await supabase
    // //   .from("profiles")
    // //   .select("*")
    // //   .eq("id", user.id)
    // //   .single();
    set({ user: email, profile: email, isAuthenticated: true });
  },

  register: async ({ email, password, username }) => {
    // const {
    //   data: { user },
    //   error,
    // } = await supabase.auth.signUp({
    //   email,
    //   password,
    // });
    // if (error) throw error;
    // const { data: profile } = await supabase
    //   .from("profiles")
    //   .select("*")
    //   .eq("id", user.id)
    //   .single();
    set({ user: email, profile: email, isAuthenticated: true });
  },

  logout: async () => {
    // await supabase.auth.signOut();
    set({ user: null, profile: null, isAuthenticated: false });
  },
}));
