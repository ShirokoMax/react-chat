export const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return `${dateObj.toLocaleString()}`;
};

// Сделать чтобы часовой пояс менялся от часовой зоны клиента
