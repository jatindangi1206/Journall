interface User {
  username: string;
  name: string;
  isAdmin: boolean;
}

const CREDENTIALS = {
  username: 'jatindangi007',
  password: 'Footballer07@',
  name: 'Jatin'
};

export const login = (username: string, password: string): User | null => {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    const user = {
      username: CREDENTIALS.username,
      name: CREDENTIALS.name,
      isAdmin: true
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  return null;
};

export const logout = (): void => {
  localStorage.removeItem('user');
};

export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};