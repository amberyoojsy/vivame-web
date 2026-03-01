import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-[#F8F9FA] pt-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-20 -right-20 w-96 h-96 bg-[#00B7F1]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#00B7F1]/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              <span className="block text-gray-900 mb-2 lg:mb-3">
                비상의 문화를 깨우는{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-[#00B7F1]/20 to-blue-400/20 blur-xl"></span>
                  <span className="relative bg-gradient-to-r from-[#00B7F1] to-blue-600 bg-clip-text text-transparent">
                    날갯짓 💙
                  </span>
                </span>
              </span>
              <span className="block text-gray-900 mb-2 lg:mb-3">
                함께 성장하고 변화를 만드는
              </span>
              <span className="block text-gray-900">
                19기 비바미가 되어주세요 ✨
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-900">Visang Value Messenger</span>
              <br />
              비상의 가치를 전파하고 즐거운 일터를 만드는 변화의 주인공
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link to="/apply">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 py-4 bg-[#00B7F1] text-white rounded-full font-medium text-lg flex items-center justify-center gap-2 shadow-lg shadow-[#00B7F1]/30 hover:shadow-xl hover:shadow-[#00B7F1]/40 transition-all duration-300"
                >
                  지금 바로 지원하기
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}