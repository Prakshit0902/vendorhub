// utils/cn.js
export function cn(...inputs) {
  const classes = inputs.filter(Boolean).join(' ');
  return classes;
}