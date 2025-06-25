// appStore.ts
import { create } from "zustand";

// Define the state type
interface AppState {
  openModal: boolean;
  profileModal: boolean;
  isOpenSkillModal: boolean;
  isOpenExperience: boolean;
  isOpenProjectDrawer: boolean;
  isOpenTestimonialDrawer: boolean;
  isFinishedOnboarding: boolean;
  appUser: string;
  setOpenModal: (openModal: boolean) => void;
  setOpenExperience: (openModal: boolean) => void;
  setOpenSkillModal: (openModal: boolean) => void;
  setOpenProfileModal: (openModal: boolean) => void;
  setOpenProjectDrawer: (openDrawer: boolean) => void;
  setOpenTestimonialDrawer: (openDrawer: boolean) => void;
  setFinishedOnboarding: (isFinishedOnboarding: boolean) => void;
  setAppUser: (user: string) => void;
}

// Create the store with type annotations
const useAppStore = create<AppState>((set) => ({
  openModal: false,
  profileModal: false,
  isOpenSkillModal: false,
  isOpenExperience: false,
  isOpenProjectDrawer: false,
  isOpenTestimonialDrawer: false,
  isFinishedOnboarding: false,
  appUser: "Guest",
  setOpenModal: (openModal) => set({ openModal }),
  setOpenExperience: (isOpenExperience) => set({ isOpenExperience }),
  setOpenSkillModal: (isOpenSkillModal) => set({ isOpenSkillModal }),
  setOpenProfileModal: (profileModal) => set({ profileModal }),
  setOpenProjectDrawer: (isOpenProjectDrawer) => set({ isOpenProjectDrawer }),
  setOpenTestimonialDrawer: (isOpenTestimonialDrawer) => set({ isOpenTestimonialDrawer }),
  setFinishedOnboarding: (isFinishedOnboarding) => set({ isFinishedOnboarding }),
  setAppUser: (appUser) => set({ appUser }),
}));

export default useAppStore;
