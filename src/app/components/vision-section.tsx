import { motion } from "motion/react";
import { Heart, Users, Sparkles } from "lucide-react";

const roles = [
  {
    icon: Heart,
    title: "우리의 믿음 내재화",
    firstLine: "조직의 믿음을 공감과 실천으로 내재화.",
    secondLine: "비상의 핵심 가치를 이해하고 동료들에게 긍정적인 에너지를 전파합니다.",
    color: "#00B7F1",
  },
  {
    icon: Sparkles,
    title: "사회적 가치 연결",
    firstLine: "작은 실천을 연결해 사회적 가치를 만드는 일.",
    secondLine: "나눔과 배려로 더 나은 사회를 향한 변화를 만들어갑니다.",
    color: "#00B7F1",
  },
  {
    icon: Users,
    title: "즐거운 일터 만들기",
    firstLine: "서로의 온기를 회복하고, 즐거운 일터 문화를 만들어가는 일.",
    secondLine: "소통과 공감으로 행복한 조직 문화를 디자인합니다.",
    color: "#00B7F1",
  },
];

export function VisionSection() {
  return (
    <section id="requirements" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            우리는 이런 변화를 만듭니다
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            비바미와 함께 비상의 문화를 더욱 풍요롭게
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#00B7F1]/50 hover:shadow-xl hover:shadow-[#00B7F1]/10 transition-all duration-300">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: `${role.color}15` }}
                >
                  <role.icon
                    className="w-8 h-8"
                    style={{ color: role.color }}
                  />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                  {role.title}
                </h3>
                <div className="space-y-3">
                  <p className="text-base lg:text-lg font-semibold text-[#00B7F1] leading-relaxed">
                    {role.firstLine}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {role.secondLine}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}