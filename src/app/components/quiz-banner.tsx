import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle, X } from "lucide-react";

const quizQuestions = [
  {
    question: '"이거 비바미가 하면 딱인데?"라고 한 번쯤 생각해본 적 있다.',
    id: "q1",
  },
  {
    question: "재미있는 일엔 슬쩍 발 담가보고 싶은 편이다.",
    id: "q2",
  },
  {
    question: "누군가를 도와주면 괜히 기분이 좋아진다.",
    id: "q3",
  },
  {
    question: "회사가 조금 더 즐거워지면 좋겠다고 생각한 적 있다.",
    id: "q4",
  },
];

export function QuizBanner() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, answer: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const yesCount = Object.values(answers).filter((a) => a).length;
  const isReady = yesCount >= 3;

  return (
    <>
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-gradient-to-r from-[#00B7F1] to-blue-600 rounded-3xl p-8 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-5xl font-bold text-white mb-6"
              >
                나도 비바미가 될 수 있을까?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg lg:text-xl text-white/90 mb-8"
              >
                가볍게 체크해보는 10초.
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowQuiz(true)}
                className="px-8 py-4 bg-white text-[#00B7F1] rounded-full font-bold text-lg hover:shadow-xl transition-all duration-300"
              >
                지금 테스트하기
              </motion.button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => {
              setShowQuiz(false);
              setAnswers({});
              setShowResult(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 lg:p-12 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  비바미 적합도 테스트
                </h3>
                <button
                  onClick={() => {
                    setShowQuiz(false);
                    setAnswers({});
                    setShowResult(false);
                  }}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {!showResult ? (
                <div className="space-y-4">
                  {quizQuestions.map((q) => (
                    <label
                      key={q.id}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100/80 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={answers[q.id] === true}
                        onChange={(e) => handleAnswer(q.id, e.target.checked)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-[#00B7F1] focus:ring-[#00B7F1]"
                      />
                      <span className="font-medium text-gray-900">{q.question}</span>
                    </label>
                  ))}

                  <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      className="w-full px-8 py-4 bg-[#00B7F1] text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                    >
                      결과 확인하기
                    </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center space-y-6"
                >
                  {isReady ? (
                    <>
                      <div className="w-24 h-24 bg-[#00B7F1]/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-16 h-16 text-[#00B7F1]" />
                      </div>
                      <h4 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        축하합니다! 🎉
                      </h4>
                      <p className="text-lg text-gray-700">
                        당신은 비바미에 완벽하게 적합합니다!
                        <br />
                        지금 바로 지원하여 변화의 주인공이 되어보세요.
                      </p>
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          window.location.href = "/apply";
                        }}
                        className="px-8 py-4 bg-[#00B7F1] text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                      >
                        지금 바로 지원하기
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-16 h-16 text-gray-400" />
                      </div>
                      <h4 className="text-2xl lg:text-3xl font-bold text-gray-900">
                        조금 더 고민해보세요
                      </h4>
                      <p className="text-lg text-gray-700">
                        비바미 활동에 대해 조금 더 알아보신 후<br />
                        다시 도전해보시는 건 어떨까요?
                      </p>
                      <button
                        onClick={() => {
                          setShowQuiz(false);
                          setAnswers({});
                          setShowResult(false);
                        }}
                        className="px-8 py-4 bg-gray-800 text-white rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300"
                      >
                        더 알아보기
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}