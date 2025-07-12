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
    <div className="flex flex-col items-center justify-center mx-auto w-full bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="w-80 h-96 mx-auto overflow-hidden rounded-2xl mt-4">
        <img
          src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>

      <div className="text-2xl font-bold text-center text-red-500 font-serif tracking-wide mt-4">
        <div className="text-2xl font-bold text-center text-red-500 font-serif tracking-wider">
          THƯ MỜI CƯỚI
        </div>
        <div className="text-xl font-bold text-center text-red-500  font-serif italic">
          Anh Vũ & Kim Triệu
        </div>
      </div>

      <div className="my-2 flex flex-col items-center">
        <div className="relative w-40 rounded-lg shadow-lg border-2 border-red-500 bg-white overflow-hidden font-serif">
          {/* Header: Tháng */}
          <div className="bg-red-500 text-white text-center py-1 text-lg font-extrabold tracking-widest font-cormorant">
            Tháng 6/2025
          </div>
          {/* Ngày lớn */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="text-[64px] font-extrabold text-red-600 leading-none drop-shadow-sm font-cormorant">
              22
            </div>
            <div className="text-base text-gray-700 font-semibold italic font-cormorant">
              Chủ Nhật
            </div>
          </div>
          {/* Footer: Ngày âm lịch hoặc thông tin thêm */}
          <div className="bg-yellow-100 text-yellow-800 text-center py-1 text-sm font-medium border-t border-yellow-300 font-cormorant">
            18 giờ 00 phút
          </div>
        </div>
      </div>

      <div className="h-[1px] w-40 bg-red-500 my-4" />

      <div className="text-lg font-bold text-center text-red-500 font-serif tracking-wide">
        <div className="flex flex-col text-sm items-center">
          <div>Nhà Trai</div>
          <div>Ngô Văn Tuấn</div>
          <div>Nguyễn Thị Bích Phượng</div>
        </div>
        <div className="text-xs text-gray-500 font-serif italic">
          18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
        </div>
        <div className="relative flex flex-col items-center mt-2">
          <img
            className="rounded-md overflow-hidden"
            src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
            width={300}
            height={300}
            alt="Picture of the author"
          />
          <div className="absolute bottom-4 left-0 right-0 text-white text-center font-cormorant">
            Chú rễ Anh Vũ
          </div>
        </div>
      </div>

      <div className="h-[1px] w-40 bg-red-500 my-4" />

      <div className="text-lg font-bold text-center text-red-500 font-serif tracking-wide">
        <div className="flex flex-col text-sm items-center">
          <div>Nhà Gái</div>
          <div>Ông Đặng Văn Đức</div>
          <div>Bà Huỳnh Mai</div>
        </div>
        <div className="text-xs text-gray-500 font-serif italic">
          Đồng Tháp, Tỉnh Đồng Tháp
        </div>
        <div className="relative flex flex-col items-center mt-2">
          <img
            src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
            width={300}
            height={300}
            alt="Picture of the author"
          />
          <div className="absolute bottom-4 left-0 right-0 text-pink-500 text-center font-cormorant">
            Cô dâu Kim Triệu
          </div>
        </div>
      </div>

      <div className="h-[1px] w-40 bg-red-500 my-4" />
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold text-center text-red-500 font-serif tracking-wide">
          Thư Mời
        </div>
        <div className="text-sm font-bold text-center text-red-500 font-serif tracking-wide">
          Tham dự lễ cưới Anh Vũ & Kim Triệu
        </div>
        <div className="flex justify-center items-center gap-4 my-8">
          <img
            src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
            alt="Ảnh cưới 1"
            className="w-40 h-28 object-cover rounded-xl shadow-lg rotate-[-8deg] border-4 border-white"
          />
          <img
            src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
            alt="Ảnh cưới 2"
            className="w-44 h-32 object-cover rounded-xl shadow-xl rotate-[6deg] border-4 border-white z-10"
          />
          <img
            src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
            alt="Ảnh cưới 3"
            className="w-40 h-28 object-cover rounded-xl shadow-lg rotate-[10deg] border-4 border-white"
          />
        </div>
        <div className="text-sm font-bold text-center text-red-500 font-serif tracking-wide">
          TIỆC MỪNG LỄ TÂN HÔN
        </div>
        <div className="flex flex-col items-center my-4">
          <div className="flex items-center gap-2">
            <div className="text-red-500 font-serif font-bold text-base">
              Vào lúc
            </div>
            <span className="inline-block bg-red-500 text-white rounded-full px-3 py-1 text-base font-bold font-serif shadow-md">
              18:00
            </span>
            <span className="text-red-500 font-serif font-bold text-base">
              Chủ Nhật
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-block bg-white border border-red-500 text-red-500 rounded-lg px-4 py-1 text-lg font-bold font-serif shadow">
              22
            </span>
            <span className="text-red-500 font-serif font-bold text-base">
              tháng 6
            </span>
            <span className="text-red-500 font-serif font-bold text-base">
              năm 2025
            </span>
          </div>
          <span className="text-red-500 font-serif font-bold text-base mt-2">
            (Tức ngày 22 tháng 6 năm 2025 Âm Lịch)
          </span>
        </div>
      </div>

      <div className="text-lg font-bold text-center text-red-500 font-serif tracking-wide">
        <div className="text-2xl font-bold text-center text-red-500 font-serif tracking-wide">
          Địa điểm tổ chức
        </div>
        <div className="text-sm font-bold text-center text-red-500 font-serif tracking-wide">
          Nhà Hàng Cây Bàng
        </div>
        <div className="text-sm font-bold text-center text-red-500 font-serif tracking-wide mb-4">
          Địa chỉ: 18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
        </div>
        <div className="flex justify-center mt-2">
          <iframe
            title="Bản đồ Nhà Hàng Cây Bàng"
            src="https://www.google.com/maps?q=18+Hồ+Xuân+Hương,+P.Mũi+Né,+Tỉnh+Lâm+Đồng&output=embed"
            width="350"
            height="200"
            style={{
              border: 0,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="h-[1px] w-40 bg-red-500 my-4" />
    </div>
  );
}
