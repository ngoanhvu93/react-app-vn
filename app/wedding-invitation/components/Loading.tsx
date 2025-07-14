import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <div className="bg-gradient-to-br absolute top-1/2 -translate-y-1/2  left-1/2 -translate-x-1/2 w-full h-screen from-red-50 via-pink-50 to-rose-100 overflow-hidden flex items-center justify-center pb-28">
      <DotLottieReact
        src="https://lottie.host/a9035f38-a11a-4ea6-a5b2-6ccab0bf3d71/jLGLmOtYkz.lottie"
        loop
        autoplay
      />
    </div>
  );
}
