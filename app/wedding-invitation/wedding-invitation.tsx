export function meta() {
  return [
    { title: "Thiệp mời cưới - Anh Vũ & Kim Triệu" },
    {
      name: "description",
      content: "Thiệp mời cưới của Anh Vũ & Kim Triệu - Chủ Nhật, 22/06/2025",
    },
    {
      name: "og:image",
      content:
        "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-2.jpg",
    },
  ];
}

export default function WeddingInvitation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-rose-200 to-pink-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center mx-auto w-full max-w-4xl px-4 py-8">
        {/* Hero Image with enhanced styling */}
        <div className="w-80 h-96 mx-auto overflow-hidden rounded-3xl mt-4 shadow-2xl transform hover:scale-105 transition-transform duration-500">
          <img
            src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
            width={500}
            height={500}
            alt="Ảnh cưới chính"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Title with enhanced typography */}
        <div className="text-center mt-8 space-y-2">
          <div className="text-3xl font-bold text-red-600 font-serif tracking-widest drop-shadow-sm">
            THƯ MỜI CƯỚI
          </div>
          <div className="text-2xl font-bold text-red-500 font-serif italic bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
            Anh Vũ & Kim Triệu
          </div>
        </div>

        {/* Enhanced Date Card */}
        <div className="my-6 flex flex-col items-center">
          <div className="relative w-44 rounded-2xl shadow-2xl border-2 border-red-500 bg-white overflow-hidden transform hover:scale-105 transition-transform duration-300">
            {/* Header: Tháng */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-2 text-lg font-extrabold tracking-widest font-cormorant">
              Tháng 6/2025
            </div>
            {/* Ngày lớn */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="text-[72px] font-extrabold text-red-600 leading-none drop-shadow-sm font-cormorant bg-gradient-to-b from-red-600 to-pink-600 bg-clip-text text-transparent">
                22
              </div>
              <div className="text-lg text-gray-700 font-semibold italic font-cormorant">
                Chủ Nhật
              </div>
            </div>
            {/* Footer: Thời gian */}
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-center py-2 text-sm font-medium border-t border-yellow-300 font-cormorant">
              18 giờ 00 phút
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent my-6" />

        {/* Groom's Family Section */}
        <div className="text-center space-y-4 w-full max-w-md">
          <div className="text-xl font-bold text-red-600 font-serif tracking-wide">
            <div className="flex flex-col text-base items-center space-y-1">
              <div className="text-lg font-bold">Nhà Trai</div>
              <div className="font-semibold">Ngô Văn Tuấn</div>
              <div className="font-semibold">Nguyễn Thị Bích Phượng</div>
            </div>
            <div className="text-xs text-gray-600 font-serif italic mt-2">
              18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
            </div>
          </div>
          <div className="relative flex flex-col items-center mt-4">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                className="w-full h-full object-cover"
                src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
                alt="Chú rễ Anh Vũ"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-white text-center font-cormorant font-bold text-lg drop-shadow-lg">
              Chú rễ Anh Vũ
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent my-6" />

        {/* Bride's Family Section */}
        <div className="text-center space-y-4 w-full max-w-md">
          <div className="text-xl font-bold text-red-600 font-serif tracking-wide">
            <div className="flex flex-col text-base items-center space-y-1">
              <div className="text-lg font-bold">Nhà Gái</div>
              <div className="font-semibold">Ông Đặng Văn Đức</div>
              <div className="font-semibold">Bà Huỳnh Mai</div>
            </div>
            <div className="text-xs text-gray-600 font-serif italic mt-2">
              Đồng Tháp, Tỉnh Đồng Tháp
            </div>
          </div>
          <div className="relative flex flex-col items-center mt-4">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
              <img
                src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
                alt="Cô dâu Kim Triệu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-pink-500 text-center font-cormorant font-bold text-lg drop-shadow-lg">
              Cô dâu Kim Triệu
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent my-6" />

        {/* Invitation Section */}
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold text-red-600 font-serif tracking-wide">
              Thư Mời
            </div>
            <div className="text-base font-semibold text-red-500 font-serif tracking-wide">
              Tham dự lễ cưới Anh Vũ & Kim Triệu
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="flex justify-center items-center gap-6 my-8">
            <img
              src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
              alt="Ảnh cưới 1"
              className="w-40 h-28 object-cover rounded-xl shadow-lg rotate-[-8deg] border-4 border-white transform hover:scale-110 transition-transform duration-300"
            />
            <img
              src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
              alt="Ảnh cưới 2"
              className="w-44 h-32 object-cover rounded-xl shadow-xl rotate-[6deg] border-4 border-white z-10 transform hover:scale-110 transition-transform duration-300"
            />
            <img
              src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
              alt="Ảnh cưới 3"
              className="w-40 h-28 object-cover rounded-xl shadow-lg rotate-[10deg] border-4 border-white transform hover:scale-110 transition-transform duration-300"
            />
          </div>

          <div className="text-lg font-bold text-center text-red-600 font-serif tracking-wide">
            TIỆC MỪNG LỄ TÂN HÔN
          </div>

          {/* Enhanced Time and Date Display */}
          <div className="flex flex-col items-center space-y-4 my-6 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="text-red-600 font-serif font-bold text-lg">
                Vào lúc
              </div>
              <span className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full px-4 py-2 text-lg font-bold font-serif shadow-lg">
                18:00
              </span>
              <span className="text-red-600 font-serif font-bold text-lg">
                Chủ Nhật
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block bg-white border-2 border-red-500 text-red-500 rounded-xl px-6 py-2 text-xl font-bold font-serif shadow-lg">
                22
              </span>
              <span className="text-red-600 font-serif font-bold text-lg">
                tháng 6
              </span>
              <span className="text-red-600 font-serif font-bold text-lg">
                năm 2025
              </span>
            </div>
            <span className="text-red-600 font-serif font-bold text-base text-center">
              (Tức ngày 22 tháng 6 năm 2025 Âm Lịch)
            </span>
          </div>
        </div>

        {/* Venue Section */}
        <div className="text-center space-y-4 w-full max-w-2xl">
          <div className="text-2xl font-bold text-red-600 font-serif tracking-wide">
            Địa điểm tổ chức
          </div>
          <div className="text-lg font-bold text-red-600 font-serif tracking-wide">
            Nhà Hàng Cây Bàng
          </div>
          <div className="text-base font-semibold text-red-500 font-serif tracking-wide mb-6">
            18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
          </div>
          <div className="flex justify-center mt-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <iframe
                title="Bản đồ Nhà Hàng Cây Bàng"
                src="https://www.google.com/maps?q=18+Hồ+Xuân+Hương,+P.Mũi+Né,+Tỉnh+Lâm+Đồng&output=embed"
                width="400"
                height="250"
                style={{
                  border: 0,
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Final decorative divider */}
        <div className="h-[2px] w-48 bg-gradient-to-r from-transparent via-red-500 to-transparent my-8" />
      </div>
    </div>
  );
}
