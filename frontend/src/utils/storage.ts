export const USERS_KEY = "registered-users";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  createdAt: string;
}

export const getUsers = (): User[] => {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Failed to parse users:", error);
    return [];
  }
};

export const saveUsers = (users: User[]) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // 🔥 Trigger custom event for same-tab refresh
    window.dispatchEvent(new Event("usersUpdated"));
  } catch (error) {
    console.error("Failed to save users:", error);
  }
};
