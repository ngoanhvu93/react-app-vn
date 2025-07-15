import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import {
  BanknoteIcon,
  HeartIcon,
  QrCodeIcon,
  XIcon,
  CopyIcon,
  CheckIcon,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import imageBackground from "../../public/image.png";
import Loading from "./components/Loading";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export function meta() {
  return [
    { title: "Thư mời cưới - Đức Phú & Hồng Loan" },
    {
      name: "description",
      content: "Thư mời cưới của Đức Phú & Hồng Loan - Thứ Bảy, 23/08/2025",
    },
    {
      name: "og:image",
      content:
        "https://deewedding.com/wp-content/uploads/2023/10/372763945_844636273716650_9026782117946223657_n-682x1024.jpg.webp",
    },
  ];
}

export default function WeddingInvitation() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
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

  const addToCalendar = () => {
    // Create ICS file content
    const event = {
      summary: "Đám cưới Đức Phú & Hồng Loan",
      description:
        "Tham dự lễ cưới Đức Phú & Hồng Loan\n\nĐịa điểm: Nhà Hàng Cây Nhãn\nĐịa chỉ: 77 Huỳnh Tấn Phát, P.Mũi Né, Tỉnh Lâm Đồng\n\nThông tin liên hệ:\n- Chú rễ: Đức Phú\n- Cô dâu: Hồng Loan",
      location: "Nhà Hàng Cây Nhãn, 18 Hồ Xuân Hương, P.Kon Tum, Tỉnh Gia Lai",
      startDate: "20250823T110000",
      endDate: "20250823T140000", // 3 hours duration
    };

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Invitation//VN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${Date.now()}@wedding-invitation.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${event.startDate}`,
      `DTEND:${event.endDate}`,
      `SUMMARY:${event.summary}`,
      `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
      `LOCATION:${event.location}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    // Create and download the ICS file
    const blob = new Blob([icsContent], {
      type: "text/calendar;charset=utf-8",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "dam-cuoi-duc-phu-hong-loan.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <Loading />;
  }

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
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 overflow-hidden max-w-md mx-auto pb-8"
    >
      <div
        className={`relative z-10 flex flex-col items-center justify-center mx-auto w-full pt-10 px-4`}
      >
        <img
          src={imageBackground}
          alt="Background"
          className="w-md h-[700px] absolute top-0 left-0 z-50"
        />

        {/* Hero Image with enhanced styling and animation */}
        <div className="w-64 h-96 mx-auto overflow-hidden rounded-t-full mt-2 shadow-2xl z-10">
          <img
            src="https://deewedding.com/wp-content/uploads/2023/10/372763945_844636273716650_9026782117946223657_n-682x1024.jpg.webp"
            width={500}
            height={500}
            alt="Ảnh cưới chính"
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>

        {/* Main Title with enhanced typography and animation */}
        <div className="text-center mt-8 space-y-2 z-10">
          <div className="text-xl font-bold text-red-600 font-serif tracking-widest drop-shadow-lg bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
            THƯ MỜI CƯỚI
          </div>
          <div className="text-3xl font-bold text-gray-700 font-serif italic bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text  ">
            Đức Phú & Hồng Loan
          </div>
        </div>

        {/* Enhanced Date Card with better animation */}
        <div className="flex flex-col items-center justify-center mt-4 w-full px-8">
          <div className="font-bold text-gray-800 font-dancing-script text-xl tracking-wide">
            Tháng 8
          </div>
          <div className="flex items-center justify-center w-full px-4">
            <div className="flex justify-center items-center px-4 py-2 w-full">
              <div className="text-gray-800 w-1/3 font-semibold italic font-dancing-script text-center border-y py-1 text-lg">
                Thứ 7
              </div>
              <div className="flex flex-col items-center justify-center w-1/3">
                <div className="text-4xl text-red-600 font-bold drop-shadow-sm italic font-dancing-script text-center">
                  23
                </div>
              </div>
              <div className="text-gray-800 font-semibold italic font-dancing-script text-center border-y py-1 w-1/3 text-lg">
                11h00
              </div>
            </div>
          </div>
          <div className="text-gray-800 font-semibold italic font-dancing-script text-center text-lg">
            2025
          </div>
        </div>

        {/* Groom's Family Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-md mt-14">
          <div className="text-xl font-bold text-red-700 font-serif tracking-wide">
            <div className="flex flex-col text-base items-center space-y-2">
              <div className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Nhà Trai
              </div>
              <div className="font-semibold text-gray-800">Ông Trần Văn A</div>
              <div className="font-semibold text-gray-800">Bà Nguyễn Thị B</div>
            </div>
            <div className="text-xs text-gray-700 font-serif italic mt-3">
              🏠 18 Hồ Xuân Hương, P.Kon Tum, Tỉnh Gia Lai
            </div>
          </div>
          <div className="relative flex flex-col items-center mt-6">
            <div className="w-full h-80 rounded-t-3xl overflow-hidden shadow-2xl">
              <img
                className="w-full h-full object-cover transition-transform duration-700"
                src="https://cdn-i.doisongphapluat.com.vn/media/nguyen-thi-quynh/2022/04/08/nha-hang-hinh-anh-full-hd-dam-cuoi-hyun-bin-son-ye-jin-anh-mat-chu-re-ngong-cho-co-dau-qua-doi-ngot-ngao-1.png"
                alt="Chú rễ Anh Vũ"
              />
            </div>
            <div className="w-full text-white text-center font-serif font-bold text-lg drop-shadow-lg bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 rounded-b-3xl">
              👨‍💼 Chú rễ Đức Phú
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Bride's Family Section with enhanced styling */}
        <div className="text-center space-y-6 w-full max-w-md">
          <div className="text-xl font-bold text-red-700 font-serif tracking-wide">
            <div className="flex flex-col text-base items-center space-y-2">
              <div className="text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                Nhà Gái
              </div>
              <div className="font-semibold text-gray-800">Ông Trần Văn A</div>
              <div className="font-semibold text-gray-800">Bà Nguyễn Thị B</div>
            </div>
            <div className="text-xs text-gray-700 font-serif italic mt-3">
              🏠 18 Hồ Xuân Hương, P.Ninh Thuận, Tỉnh Khánh Hoà
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
              👰‍♀️ Cô dâu Hồng Loan
            </div>
          </div>
        </div>

        {/* Enhanced decorative divider */}
        <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent my-8 rounded-full shadow-lg" />

        {/* Invitation Section with enhanced styling */}
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4">
            <div className="text-2xl font-bold text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
              Thư Mời
            </div>
            <div className="font-semibold text-gray-700 font-serif tracking-wide">
              Tham dự lễ cưới Đức Phú & Hồng Loan
            </div>
          </div>

          {/* Enhanced Photo Gallery */}
          <div className="max-w-md cursor-grab">
            <Swiper
              watchSlidesProgress={true}
              modules={[FreeMode, Pagination, Navigation, Autoplay]}
              slidesPerView={3}
              spaceBetween={10}
              freeMode
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
            >
              {[
                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-6.jpg",
                  alt: "Ảnh 6",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },
                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-7.jpg",
                  alt: "Ảnh 7",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },
                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-8.jpg",
                  alt: "Ảnh 8",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },

                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-10.jpg",
                  alt: "Ảnh 10",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },
                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-6.jpg",
                  alt: "Ảnh 6",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },
                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-7.jpg",
                  alt: "Ảnh 7",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },
                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-8.jpg",
                  alt: "Ảnh 8",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },

                {
                  src: "https://calibridal.com.vn/wp-content/uploads/2021/05/hinh-cong-dam-cuoi-10.jpg",
                  alt: "Ảnh 10",
                  bg: "from-pink-100 to-rose-100",
                  text: "text-pink-700",
                },
              ].map((img, i) => (
                <SwiperSlide key={i}>
                  <img src={img.src} alt={img.alt} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="text-xl font-bold text-center text-red-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text">
            🎉 TIỆC MỪNG LỄ TÂN HÔN 🎉
          </div>

          {/* Enhanced Time and Date Display */}
          <div className="flex flex-col items-center justify-center w-full px-8">
            <div className="font-bold text-gray-800 font-dancing-script text-xl tracking-wide">
              Tháng 8
            </div>
            <div className="flex items-center justify-center w-full px-4">
              <div className="flex justify-center items-center px-4 py-2 w-full">
                <div className="text-gray-800 font-semibold italic font-dancing-script text-center border-y py-1 w-1/3 text-lg">
                  11h00
                </div>
                <div className="flex flex-col items-center justify-center w-1/3">
                  <div className="text-4xl text-red-600 font-bold drop-shadow-sm italic font-dancing-script text-center">
                    23
                  </div>
                </div>
                <div className="text-gray-800 w-1/3 font-semibold italic font-dancing-script text-center border-y py-1 text-lg">
                  Thứ 7
                </div>
              </div>
            </div>
            <div className="text-gray-800 font-semibold italic font-dancing-script text-center text-lg">
              2025
            </div>
          </div>
        </div>

        {/* Venue Section with enhanced styling */}
        <div className="text-center w-full mt-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl space-y-4">
            <div className="text-2xl font-bold text-gray-700 font-serif tracking-wide bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text pt-4">
              Địa điểm tổ chức
            </div>
            <div className="text-2xl font-bold text-gray-700 font-serif tracking-wide">
              Nhà Hàng Cây Nhãn
            </div>
            <div className="font-semibold text-gray-700  text-sm tracking-wide mb-4">
              📍 77 Huỳnh Tấn Phát, P.Mũi Né, Tỉnh Lâm Đồng
            </div>
            <div className="flex justify-center mt-4">
              <div className="overflow-hidden shadow-2xl w-full h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5681.371598421391!2d108.29080971155933!3d10.939303191364052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31768fc5359bbae9%3A0x37dcbf9e8022cc57!2zTmjDoCBIw6BuZyBDw6J5IE5ow6Nu!5e0!3m2!1svi!2s!4v1752506954730!5m2!1svi!2s"
                  style={{ border: "0", width: "100%", height: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            {/* Google Maps Button */}
            <div className="flex gap-2 items-center justify-between pb-4 w-full px-4">
              <div className="w-full flex justify-center">
                <button
                  onClick={() => {
                    const googleMapsUrl = `https://maps.app.goo.gl/Gei23kA6hMZsp6jc7`;
                    window.open(googleMapsUrl, "_blank");
                  }}
                  className="flex w-full cursor-pointer justify-center items-center gap-2 text-gray-600 py-2 px-4 rounded-full shadow-lg border"
                >
                  <span>Mở Google Maps</span>
                </button>
              </div>
              {/* Calendar Button */}
              <div className="w-full flex justify-center ">
                <button
                  onClick={addToCalendar}
                  className="flex items-center cursor-pointer justify-center gap-2 text-gray-600 text-shadow-sx py-2 px-4 rounded-full shadow-lg border w-full"
                >
                  <span>Thêm vào lịch</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Final enhanced decorative divider */}
        <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-red-600 to-transparent my-10 rounded-full shadow-lg" />

        {/* Enhanced Gửi Mừng Cưới Button */}
        <div className="relative h-full w-full flex items-center justify-center">
          {" "}
          <button
            onClick={openDialog}
            className="text-center cursor-pointer z-50 w-full text-red-600 font-serif tracking-wide bg-white/95 backdrop-blur-md rounded-full p-4 shadow-2xl border border-red-400 hover:border-red-500 text-lg font-bold"
          >
            💝 Gửi Mừng Cưới 💝
          </button>
        </div>
      </div>
      <DotLottieReact
        onClick={openDialog}
        src="https://lottie.host/e36f6c65-6b58-4da6-90ca-8e8564fda864/WM1f1JAa9l.lottie"
        loop
        autoplay
        className="absolute cursor-pointer bottom-0 left-0  z-50 h-40 w-full"
      />

      {/* Enhanced Dialog for QR Code and Bank Information */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        className="relative z-50"
        as="div"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-2">
          <DialogPanel className="bg-white rounded-3xl shadow-3xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-500 scale-100">
            {/* Enhanced Dialog Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-pink-600 text-white p-4 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <DialogTitle className="text-2xl font-bold font-serif flex items-center justify-center">
                  <HeartIcon className="w-6 h-6" />
                  <span className="ml-2">Gửi Mừng Cưới</span>
                </DialogTitle>
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
                          TRẦN ĐỨC PHÚ
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
                          NGUYỄN THỊ HỒNG LOAN
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
          </DialogPanel>
        </div>
      </Dialog>
    </motion.div>
  );
}
