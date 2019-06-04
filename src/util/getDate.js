export default function getDate() {
  return {
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    hours: new Date().getHours(),
    min: new Date().getMinutes(),
    sec: new Date().getSeconds()
  };
}
