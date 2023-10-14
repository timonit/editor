export function uuid(): string {
  const date = new Date();
  return `${String(date.getTime())}${(Math.random()*1000).toFixed()}`
};
