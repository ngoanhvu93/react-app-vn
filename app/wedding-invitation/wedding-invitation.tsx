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
      content: "Thiệp mời cưới của Anh Vũ & Kim Triệu - Thứ Bảy, 23/08/2025",
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
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

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
    <div className="relative min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 overflow-hidden max-w-md mx-auto pb-8">
      <div
        className={`relative z-10 flex flex-col items-center justify-center mx-auto w-full pt-10`}
      >
        <img
          src="../../public/image.png"
          alt="Ảnh cưới chính"
          className="w-screen h-[700px] absolute top-0 left-0 z-50"
        />
        {/* Hero Image with enhanced styling and animation */}
        <div className="w-62 h-96 mx-auto overflow-hidden rounded-t-full mt-2 shadow-2xl">
          <img
            src="https://deewedding.com/wp-content/uploads/2023/10/372763945_844636273716650_9026782117946223657_n-682x1024.jpg.webp"
            width={500}
            height={500}
            alt="Ảnh cưới chính"
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>

        {/* Main Title with enhanced typography and animation */}
        <div className="text-center mt-8 space-y-2 animate-fade-in">
          <div className="text-xl font-bold text-red-600 font-serif tracking-widest drop-shadow-lg bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
            THƯ MỜI CƯỚI
          </div>
          <div className="text-3xl font-bold text-gray-700 font-serif italic bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text  ">
            Anh Vũ & Kim Triệu
          </div>
        </div>

        {/* Enhanced Date Card with better animation */}
        <div className="my-4 flex flex-row items-center justify-center">
          <div className="relative flex flex-row items-center w-auto rounded-3xl shadow-2xl border-2 border-red-200 bg-white overflow-hidden px-4 py-2">
            {/* Ngày lớn */}
            <div className="flex flex-col items-center justify-center pr-6 border-r border-red-200">
              <div className="text-3xl font-bold text-red-600 leading-none drop-shadow-sm font-cormorant bg-gradient-to-b from-red-700 to-pink-700 bg-clip-text">
                23
              </div>
              <div className="text-xl text-gray-800 font-semibold italic font-cormorant text-center">
                Thứ Bảy
              </div>
            </div>
            {/* Header: Tháng */}
            <div className="flex flex-col items-center justify-center pl-6">
              <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-center py-2 px-4 text-lg font-bold tracking-widest font-cormorant rounded-2xl shadow-md">
                Tháng 8/2025
              </div>
            </div>
          </div>
        </div>

        {/* Groom's Family Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-md mt-14">
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
          <div className="relative flex flex-col items-center mt-6 px-4">
            <div className="w-full h-80 rounded-t-3xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover transition-transform duration-700"
                src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
                alt="Chú rễ Anh Vũ"
              />
            </div>
            <div className="w-full text-white text-center font-serif font-bold text-lg drop-shadow-lg bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 rounded-b-3xl">
              👨‍💼 Chú rễ Anh Vũ
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Bride's Family Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-md px-4">
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
            <div className="w-full h-80 rounded-t-3xl overflow-hidden shadow-2xl">
              <img
                src="https://2hstudio.vn/wp-content/uploads/2024/12/36.jpg"
                alt="Cô dâu Kim Triệu"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full text-white font-serif text-center font-cormorant font-bold text-lg drop-shadow-lg bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 rounded-b-3xl">
              👰‍♀️ Cô dâu Kim Triệu
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Invitation Section with enhanced styling */}
        <div className="flex flex-col items-center space-y-8 px-4">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
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
              className="w-44 h-32 object-cover rounded-2xl shadow-xl rotate-[-8deg]"
            />
            <img
              src="https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-4.jpg"
              alt="Ảnh cưới 2"
              className="w-48 h-36 object-cover rounded-2xl shadow-2xl rotate-[6deg] z-10"
            />
            <img
              src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
              alt="Ảnh cưới 3"
              className="w-44 h-32 object-cover rounded-2xl shadow-xl rotate-[10deg]"
            />
          </div>

          <div className="text-xl font-bold text-center text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
            🎉 TIỆC MỪNG LỄ TÂN HÔN 🎉
          </div>

          {/* Enhanced Time and Date Display */}
          <div className="flex flex-col items-center justify-center mb-6 w-full">
            <div className="text-center text-gray-700 font-serif mb-2">
              Vào Lúc <span className="font-bold text-black">11h00</span> |{" "}
              <span className="font-bold text-black">Chủ Nhật</span>
            </div>
            <div className="flex flex-row items-center justify-center bg-[#f5ede7] rounded-xl px-6 py-2 shadow border border-gray-200 w-full">
              <div className="flex w-1/3 flex-col items-center pr-6 border-r border-gray-400">
                <div className="text-base font-bold text-black font-serif tracking-wide">
                  Tháng 06
                </div>
              </div>
              <div className="flex w-1/3 flex-col items-center px-6">
                <div
                  className="text-4xl font-cormorant font-bold text-black tracking-wider"
                  style={{ fontFamily: "'Dancing Script', 'Cormorant', serif" }}
                >
                  22
                </div>
              </div>
              <div className="flex w-1/3 flex-col items-center pl-6 border-l border-gray-400">
                <div className="text-base font-bold text-black font-serif tracking-wide">
                  2025
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Venue Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-2xl">
          <div className="text-3xl font-bold text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
            Địa điểm tổ chức
          </div>
          <div className="text-2xl font-bold text-gray-700 font-serif tracking-wide">
            Nhà Hàng Cây Bàng
          </div>
          <div className="text-lg font-semibold text-gray-700 font-serif tracking-wide mb-8">
            📍 18 Hồ Xuân Hương, P.Mũi Né, Tỉnh Lâm Đồng
          </div>
          <div className="flex justify-center mt-4 px-4">
            <div className="overflow-hidden shadow-2xl">
              <iframe
                title="Bản đồ Nhà Hàng Cây Bàng"
                src="https://www.google.com/maps?q=18+Hồ+Xuân+Hương,+P.Mũi+Né,+Tỉnh+Lâm+Đồng&output=embed"
                width="450"
                height="280"
                style={{
                  border: 0,
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
        <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent my-10 rounded-full shadow-lg" />

        {/* Enhanced Gửi Mừng Cưới Button */}
        <button
          onClick={openDialog}
          className="text-center text-red-600 font-serif tracking-wide bg-white/95 backdrop-blur-md rounded-full p-4 shadow-2xl border-4 border-red-400 hover:border-red-500 text-lg font-bold"
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
          <Dialog.Panel className="bg-white rounded-3xl shadow-3xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 scale-100">
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
                  <div className="w-56 h-56 mx-auto bg-white rounded-2xl p-6 shadow-2xl border-4 border-red-200">
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
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
