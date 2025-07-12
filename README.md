# Wedding Invitation Creator

Ứng dụng tạo thiệp cưới đẹp và lưu trữ trên Firebase. Cho phép người dùng tạo thiệp cưới tùy chỉnh với thông tin cá nhân và chia sẻ với bạn bè, gia đình.

## Tính năng

- ✅ Tạo thiệp cưới tùy chỉnh với thông tin cá nhân
- ✅ Upload và quản lý hình ảnh
- ✅ Thông tin gia đình hai bên
- ✅ Thông tin ngân hàng và mã QR
- ✅ Lưu trữ trên Firebase Firestore
- ✅ Giao diện đẹp và responsive
- ✅ Chia sẻ thiệp cưới qua URL

## Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd react-app-vn
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Cấu hình Firebase:

   - Tạo project Firebase mới
   - Bật Firestore Database
   - Bật Storage
   - Cập nhật thông tin cấu hình trong `app/lib/firebase.ts`

4. Chạy ứng dụng:

```bash
npm run dev
```

## Cấu hình Firebase

1. Tạo project Firebase tại [console.firebase.google.com](https://console.firebase.google.com)

2. Bật Firestore Database:

   - Vào Firestore Database
   - Chọn "Create database"
   - Chọn "Start in test mode"

3. Bật Storage:

   - Vào Storage
   - Chọn "Get started"
   - Chọn "Start in test mode"

4. Lấy thông tin cấu hình:

   - Vào Project Settings
   - Scroll xuống "Your apps"
   - Chọn "Web app" hoặc tạo mới
   - Copy thông tin cấu hình

5. Cập nhật `app/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
```

## Cách sử dụng

### 1. Tạo thiệp cưới mới

1. Truy cập `/tao-thiep-cuoi`
2. Điền thông tin cơ bản:

   - Tên chú rể và cô dâu
   - Ngày và giờ cưới
   - Địa điểm tổ chức

3. Thông tin gia đình:

   - Thông tin nhà trai (cha, mẹ, địa chỉ)
   - Thông tin nhà gái (cha, mẹ, địa chỉ)

4. Thông tin ngân hàng:

   - Tài khoản chú rể
   - Tài khoản cô dâu

5. Upload hình ảnh:

   - Ảnh chính
   - Ảnh chú rể
   - Ảnh cô dâu
   - Ảnh thư viện (tối đa 3 ảnh)
   - Mã QR (tùy chọn)

6. Nhấn "Tạo Thiệp Cưới" để lưu

### 2. Xem thiệp cưới

- Thiệp cưới sẽ được tạo với URL: `/thiep-cuoi/{slug}`
- Slug được tạo tự động từ tên chú rể và cô dâu
- Chia sẻ URL này với bạn bè và gia đình

## Cấu trúc dự án

```
app/
├── components/
│   └── ImageUpload.tsx          # Component upload ảnh
├── create-invitation/
│   └── create-invitation.tsx    # Trang tạo thiệp cưới
├── lib/
│   ├── firebase.ts              # Cấu hình Firebase
│   └── firebase-service.ts      # Service tương tác với Firebase
├── wedding-invitation/
│   └── wedding-invitation.tsx   # Trang hiển thị thiệp cưới
├── home/
│   └── home.tsx                 # Trang chủ
└── routes.ts                    # Cấu hình routing
```

## Công nghệ sử dụng

- **React Router v7** - Routing
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Firebase** - Backend và storage
  - Firestore - Database
  - Storage - File storage
- **Lucide React** - Icons
- **Headless UI** - UI components

## Deployment

### Vercel

1. Push code lên GitHub
2. Kết nối với Vercel
3. Cấu hình environment variables cho Firebase
4. Deploy

### Netlify

1. Push code lên GitHub
2. Kết nối với Netlify
3. Cấu hình environment variables
4. Deploy

## Lưu ý bảo mật

- Cấu hình Firebase Security Rules cho Firestore và Storage
- Giới hạn quyền truy cập dữ liệu
- Validate dữ liệu đầu vào
- Giới hạn kích thước file upload

## Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## License

MIT License
