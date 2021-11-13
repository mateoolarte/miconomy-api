export function checkAuth(user) {
  if (!user) throw new Error('Debes estar registrado para ver esta sección');
}
