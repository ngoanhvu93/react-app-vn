import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  BanknoteIcon,
  HeartIcon,
  QrCodeIcon,
  XIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const copyToClipboard = async (text: string, accountType: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAccount(accountType);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedAccount(null);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const AccountNumberDisplay = ({
    accountNumber,
    accountType,
    label,
  }: {
    accountNumber: string;
    accountType: string;
    label: string;
  }) => {
    const isGroomAccount = accountType === "groom-account";
    const textColor = isGroomAccount ? "text-red-700" : "text-pink-700";
    const hoverBgColor = isGroomAccount
      ? "hover:bg-red-50"
      : "hover:bg-pink-50";

    return (
      <div className="flex justify-between items-center">
        <span className="font-semibold text-gray-800">{label}:</span>
        <button
          onClick={() => copyToClipboard(accountNumber, accountType)}
          className={`flex items-center gap-2 ${textColor} font-bold font-mono ${hoverBgColor} px-2 py-1 rounded-lg transition-all duration-200 group`}
          title="Nhấn để copy"
        >
          <span className="group-hover:scale-105 transition-transform duration-200">
            {accountNumber}
          </span>
          {copiedAccount === accountType ? (
            <CheckIcon className="w-4 h-4 text-green-600 animate-pulse" />
          ) : (
            <CopyIcon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200" />
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 relative overflow-hidden">
      <div
        className={`relative z-10 flex flex-col items-center justify-center mx-auto w-full max-w-4xl px-4 py-8`}
      >
        {/* Hero Image with enhanced styling and animation */}
        <div className="w-80 h-96 mx-auto overflow-hidden rounded-3xl mt-4 shadow-2xl transition-all duration-700 hover:scale-105 hover:shadow-3xl transform hover:rotate-1">
          <img
            src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
            width={500}
            height={500}
            alt="Ảnh cưới chính"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Main Title with enhanced typography and animation */}
        <div className="text-center mt-8 space-y-4 animate-fade-in">
          <div className="text-3xl font-bold text-red-700 font-serif tracking-widest drop-shadow-lg bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
            THƯ MỜI CƯỚI
          </div>
          <div className="text-2xl font-bold text-red-600 font-serif italic bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent ">
            Anh Vũ & Kim Triệu
          </div>
        </div>

        {/* Enhanced Date Card with better animation */}
        <div className="my-8 flex flex-col items-center">
          <div className="relative w-48 rounded-3xl shadow-2xl border-2 border-red-200 bg-white overflow-hidden transform hover:scale-110 transition-all duration-500 hover:shadow-3xl">
            {/* Header: Tháng */}
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-center py-3 text-lg font-extrabold tracking-widest font-cormorant">
              Tháng 6/2025
            </div>
            {/* Ngày lớn */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="text-[80px] font-extrabold text-red-700 leading-none drop-shadow-sm font-cormorant bg-gradient-to-b from-red-700 to-pink-700 bg-clip-text text-transparent">
                22
              </div>
              <div className="text-xl text-gray-800 font-semibold italic font-cormorant">
                Chủ Nhật
              </div>
            </div>
            {/* Footer: Thời gian */}
            <div className="bg-gradient-to-r from-yellow-200 to-orange-200 text-yellow-900 text-center py-3 text-sm font-medium border-t-2 border-yellow-400 font-cormorant">
              18 giờ 00 phút
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[4px] w-56 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Groom's Family Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-md">
          <div className="text-xl font-bold text-red-700 font-serif tracking-wide">
            <div className="flex flex-col text-base items-center space-y-2">
              <div className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Nhà Trai
              </div>
              <div className="font-semibold text-gray-800">
                Ông Ngô Văn Tuấn
              </div>
              <div className="font-semibold text-gray-800">
                Bà Nguyễn Thị Bích Phượng
              </div>
            </div>
            <div className="text-xs text-gray-700 font-serif italic mt-3">
              🏠 18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
            </div>
          </div>
          <div className="relative flex flex-col items-center mt-6">
            <div className="w-80 h-80 rounded-t-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:scale-105">
              <img
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
                alt="Chú rễ Anh Vũ"
              />
            </div>
            <div className="w-80 text-white text-center font-serif font-bold text-lg drop-shadow-lg bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 rounded-b-3xl">
              👨‍💼 Chú rễ Anh Vũ
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[4px] w-56 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Bride's Family Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-md">
          <div className="text-xl font-bold text-red-700 font-serif tracking-wide">
            <div className="flex flex-col text-base items-center space-y-2">
              <div className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Nhà Gái
              </div>
              <div className="font-semibold text-gray-800">
                Ông Đặng Văn Đức
              </div>
              <div className="font-semibold text-gray-800">Bà Huỳnh Mai</div>
            </div>
            <div className="text-xs text-gray-700 font-serif italic mt-3">
              🏠 Đồng Tháp, Tỉnh Đồng Tháp
            </div>
          </div>
          <div className="relative flex flex-col items-center mt-6">
            <div className="w-80 h-80 rounded-t-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:scale-105">
              <img
                src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
                alt="Cô dâu Kim Triệu"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
            <div className="w-80 text-white font-serif text-center font-cormorant font-bold text-lg drop-shadow-lg bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 rounded-b-3xl">
              👰‍♀️ Cô dâu Kim Triệu
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[4px] w-56 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Invitation Section with enhanced styling */}
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
              Thư Mời
            </div>
            <div className="font-semibold text-red-600 font-serif tracking-wide">
              Tham dự lễ cưới Anh Vũ & Kim Triệu
            </div>
          </div>

          {/* Enhanced Photo Gallery */}
          <div className="flex justify-center items-center gap-8 my-10">
            <img
              src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
              alt="Ảnh cưới 1"
              className="w-44 h-32 object-cover rounded-2xl shadow-xl rotate-[-8deg] transition-all duration-500 hover:scale-110 hover:rotate-0 hover:shadow-2xl"
            />
            <img
              src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
              alt="Ảnh cưới 2"
              className="w-48 h-36 object-cover rounded-2xl shadow-2xl rotate-[6deg] z-10 transition-all duration-500 hover:scale-110 hover:rotate-0 hover:shadow-3xl"
            />
            <img
              src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
              alt="Ảnh cưới 3"
              className="w-44 h-32 object-cover rounded-2xl shadow-xl rotate-[10deg] transition-all duration-500 hover:scale-110 hover:rotate-0 hover:shadow-2xl"
            />
          </div>

          <div className="text-xl font-bold text-center text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
            🎉 TIỆC MỪNG LỄ TÂN HÔN 🎉
          </div>

          {/* Enhanced Time and Date Display */}
          <div className="flex flex-col items-center space-y-4 my-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl ">
            <div className="flex items-center gap-3">
              <div className="text-red-700 font-serif font-bold text-lg">
                Vào lúc
              </div>
              <span className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full px-4 py-2 text-lg font-bold font-serif shadow-lg">
                18:00
              </span>
              <span className="text-red-700 font-serif font-bold text-lg">
                Chủ Nhật
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block bg-white border-3 border-red-600 text-red-600 rounded-xl px-6 py-2 text-xl font-bold font-serif shadow-lg">
                22
              </span>
              <span className="text-red-700 font-serif font-bold text-lg">
                tháng 6
              </span>
              <span className="text-red-700 font-serif font-bold text-lg">
                năm 2025
              </span>
            </div>
            <span className="text-red-700 font-serif font-bold text-base text-center">
              (Tức ngày 22 tháng 6 năm 2025 Âm Lịch)
            </span>
          </div>
        </div>

        {/* Venue Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-2xl">
          <div className="text-3xl font-bold text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
            Địa điểm tổ chức
          </div>
          <div className="text-2xl font-bold text-red-700 font-serif tracking-wide">
            Nhà Hàng Cây Bàng
          </div>
          <div className="text-lg font-semibold text-red-600 font-serif tracking-wide mb-8">
            📍 18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
          </div>
          <div className="flex justify-center mt-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-3xl transform hover:scale-105">
              <iframe
                title="Bản đồ Nhà Hàng Cây Bàng"
                src="https://www.google.com/maps?q=18+Hồ+Xuân+Hương,+P.Mũi+Né,+Tỉnh+Lâm+Đồng&output=embed"
                width="450"
                height="280"
                style={{
                  border: 0,
                  borderRadius: "24px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Final enhanced decorative divider */}
        <div className="h-[4px] w-56 bg-gradient-to-r from-transparent via-red-600 to-transparent my-10 rounded-full shadow-lg" />

        {/* Enhanced Gửi Mừng Cưới Button */}
        <button
          onClick={openDialog}
          className="text-center text-red-600 font-serif tracking-wide bg-white/95 backdrop-blur-md rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 border-4 border-red-400 hover:border-red-500 text-lg font-bold"
        >
          💝 Gửi Mừng Cưới 💝
        </button>
      </div>

      {/* Enhanced Dialog for QR Code and Bank Information */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-2">
          <Dialog.Panel className="bg-white rounded-3xl shadow-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 scale-100">
            {/* Enhanced Dialog Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-2xl font-bold font-serif flex items-center justify-center">
                  <HeartIcon className="w-6 h-6" />
                  <span className="ml-2">Gửi Mừng Cưới</span>
                </Dialog.Title>
                <button
                  onClick={closeDialog}
                  className="text-white hover:text-red-100 transition-colors duration-200 p-2 rounded-full hover:bg-white/20"
                  aria-label="Đóng dialog"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Enhanced Dialog Content */}
            <div className="p-8 space-y-6">
              {/* Enhanced QR Code Section */}
              <div className="text-center space-y-4">
                <h3 className="text-xl font-bold text-red-700 font-serif flex items-center justify-center">
                  <QrCodeIcon className="w-6 h-6" />
                  <span className="ml-2">Mã QR Chuyển Khoản</span>
                </h3>
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl p-4 border-4 border-red-300 shadow-xl">
                  <div className="w-56 h-56 mx-auto bg-white rounded-2xl p-6 shadow-2xl border-4 border-red-200 transition-all duration-500 hover:shadow-3xl transform hover:scale-105">
                    {/* Placeholder for QR Code - Replace with actual QR code image */}
                    <div className="w-full h-full bg-gradient-to-br from-red-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <div className="text-center text-red-700 font-serif">
                        <div className="text-6xl mb-4">📱</div>
                        <div className="text-lg font-bold">QR Code</div>
                        <div className="text-sm text-gray-600 mt-2">
                          (Thay bằng ảnh QR thật)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Bank Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-red-700 font-serif text-center flex items-center justify-center">
                  <BanknoteIcon className="w-6 h-6" />
                  <span className="ml-2">Thông Tin Ngân Hàng</span>
                </h3>

                {/* Bank Account 1 */}
                <div className="bg-gradient-to-r from-red-100 to-pink-100 rounded-2xl p-4 border-3 border-red-300">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <h4 className="font-bold text-red-700">
                        Tài khoản Chú Rễ
                      </h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">
                          Ngân hàng:
                        </span>
                        <span className="text-red-700 font-bold">
                          Vietcombank
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">
                          Tên TK:
                        </span>
                        <span className="text-red-700 font-bold">
                          NGÔ ANH VŨ
                        </span>
                      </div>
                      <AccountNumberDisplay
                        accountNumber="1234567890"
                        accountType="groom-account"
                        label="Số TK"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Account 2 */}
                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-4 border-3 border-pink-300">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <h4 className="font-bold text-pink-700">
                        Tài khoản Cô Dâu
                      </h4>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">
                          Ngân hàng:
                        </span>
                        <span className="text-pink-700 font-bold">BIDV</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-800">
                          Tên TK:
                        </span>
                        <span className="text-pink-700 font-bold">
                          ĐẶNG KIM TRIỆU
                        </span>
                      </div>
                      <AccountNumberDisplay
                        accountNumber="0987654321"
                        accountType="bride-account"
                        label="Số TK"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Dialog Footer */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-8 rounded-b-3xl">
              <button
                onClick={closeDialog}
                className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-4 px-8 rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                ✨ Đóng ✨
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
