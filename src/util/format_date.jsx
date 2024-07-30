function formatDate(dateString) {
  // Tạo đối tượng Date từ chuỗi đầu vào
  const date = new Date(dateString);

  // Lấy ngày, tháng, năm từ đối tượng Date
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // Trả về chuỗi định dạng dd/mm/yyyy
  return `${day}/${month}/${year}`;
}

export default formatDate;
