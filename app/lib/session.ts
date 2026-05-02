export type User = {
  id: string;
  name: string;
  email: string;
  designation: string;
  created_at: string;
};

const USER_KEY = "user";

export function setUserSession(user: User) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUserSession(): User | null {
  const data = sessionStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearUserSession() {
  sessionStorage.removeItem(USER_KEY);
}