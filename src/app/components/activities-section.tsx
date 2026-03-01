import { motion } from "motion/react";
import filmFestivalImg from "figma:asset/77b26964a904eb1157042537c2b78ad9217840f0.png";
import popupBookImg from "figma:asset/ba3d688acd420de09147d358622d1070d11de3cc.png";
import bottleCapImg from "figma:asset/581d78e06a1c2d62ec139de200e1a347e4a408e9.png";
import writingRoomImg from "figma:asset/b76528670c7a36a2dda0e8a5ca464b3dbe5d0515.png";
import fakeDocuImg from "figma:asset/f898aa7ee2e3e04ea33d23490ad722f03c044bce.png";
import snackAttackImg from "figma:asset/34c800baaccd314cc9e556d471d9b977f72a5e0e.png";

const activities = [
  {
    title: "팝업북 제작 봉사",
    subtitle: "아이들에게 환경의 소중함을 전하다",
    category: "사회공헌 활동",
    description: "기후변화를 쉽고 친근하게 전달하는 팝업북을 직접 제작해 아동 복지 센터와 어린이집에 배포",
    image: popupBookImg,
  },
  {
    title: "업!뚜껑 프로젝트",
    subtitle: "작은 실천에서 시작하는 자원 순환",
    category: "사회공헌 활동",
    description: "병뚜껑 업사이클링 캠페인을 교사 연수 프로그램과 연계하여 교육 현장으로 확산",
    image: bottleCapImg,
  },
  {
    title: "간식 어택",
    subtitle: "다양한 컨셉의 깜짝 간식 이벤트",
    category: "즐거운 일터 만들기",
    description: "사무실을 찾아가는 서프라이즈 간식 선물. 매년 이어지며 구성원들의 사랑을 받는 대표 문화 활동",
    image: snackAttackImg,
  },
  {
    title: "비바미 필름 페스티벌",
    subtitle: "점심시간, 영화관 콘셉트의 문화 축제",
    category: "즐거운 일터 만들기",
    description: "핵심 가치를 주제로 한 영화를 함께 시청하며 즐겁게 배우고 나누는 대표 문화 행사",
    image: filmFestivalImg,
  },
  {
    title: "우리의 믿음이 알고 싶다",
    subtitle: "페이크 다큐 제작 & 포춘쿠키 이벤트",
    category: "우리의 믿음 내재화",
    description: "핵심 가치를 재치있게 풀어낸 다큐 영상과 포춘쿠키 QR 퀴즈 이벤트로 확장한 문화 콘텐츠",
    image: fakeDocuImg,
  },
  {
    title: "라이팅룸 프로젝트",
    subtitle: "우리의 믿음을 글로 쓰다",
    category: "우리의 믿음 내재화",
    description: "비상의 가치를 자신의 경험과 이야기로 풀어내는 글쓰기 프로젝트",
    image: writingRoomImg,
  },
];

export function ActivitiesSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            우리가 만들어온 활동들
          </h2>
          <p className="text-lg lg:text-xl text-gray-600">
            비바미의 다양한 활동 중 일부를 소개합니다
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="h-full bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#00B7F1] hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-[#00B7F1]/90 text-white text-xs font-medium rounded-full">
                      {activity.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-[#00B7F1] font-medium mb-3">
                    {activity.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {activity.description}
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