const express = require('express');
const path = require('path'); // Thêm thư viện path để xử lý đường dẫn file
const app = express();
const port = 3000;

// Nếu HTML của bạn có dùng CSS/JS/Hình ảnh bên ngoài, bỏ comment dòng bên dưới và cho các file đó vào thư mục 'public'
// app.use(express.static('public')); 

app.get('/', (req, res) => {
  // Trả về file index.html thay vì dòng chữ thông thường
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});