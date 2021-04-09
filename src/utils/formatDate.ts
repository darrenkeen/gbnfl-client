export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const mins = date.getMinutes();
  return `${hour < 10 ? `0${hour}` : hour}:${mins < 10 ? `0${mins}` : mins}`;
};
