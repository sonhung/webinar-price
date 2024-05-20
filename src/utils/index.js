export const getNewUser = (user = '') => {
  if (!user.includes(',')) return [user.trim()];
  const users = user.split(',');
  return users.map((u) => u.trim());
};
