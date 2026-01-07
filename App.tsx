
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, ChevronRight, ChevronLeft, Box, Loader2, Sparkles, Calendar, MessageCircle, Quote } from 'lucide-react';
import { toPng } from 'html-to-image';
import { AppPhase, Option } from './types';
import { QUIZ_DATA, COLORS, LINKS } from './constants';

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase>('HOME');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Option[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const downloadCardRef = useRef<HTMLDivElement>(null);

  // 導航置頂機制
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase, currentStep]);

  // 圖片預載機制
  useEffect(() => {
    const preloadImages = async () => {
      const allImages = [
        'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=60&w=1200',
        ...QUIZ_DATA.flatMap(q => q.options.map(opt => opt.image))
      ];

      const promises = allImages.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, []);

  const guidance = useMemo(() => {
    if (answers.length < QUIZ_DATA.length) return "";
    const ego = answers[0].id;
    const social = answers[1].id;
    const libido = answers[2].id;
    const creation = answers[3].id;
    const stress = answers[4].id;

    const openings = {
      A: "你擁有一顆如磐石般堅毅的心，在 2026 年，這份穩重將成為你開疆闢土的基石。",
      B: "你那如水晶般剔透的靈魂，將在未來的日子裡折射出更絢爛的光芒，照亮他人也照亮自己。",
      C: "你體內湧動著不凡的能量與靈感，2026 年將是你將夢想轉化為現實的神聖時刻。",
      D: "你懂得接納歲月的痕跡，這份真實的勇氣，將讓你在紛擾的世界中保持最純粹的平靜。"
    };

    const core = {
      A: "在人際與情感中，你懂得依託與連結，溫暖的陪伴將是你最強大的後盾。",
      B: "你守護著那份優雅的邊界感，這讓你的愛更加深邃而自由，吸引著同樣純粹的靈魂。",
      C: "你天生具有引領者的氣息，那些仰望你的人，將與你一同奔向更高遠的星空。",
      D: "即便在最安靜的時刻，你的內在依然綻放著不被察覺的生命力，靜候屬於你的花期。"
    };

    const blessings = {
      A: "那些遙遠的風暴不足為懼，因為你早已看清地平線的方向。願你在 2026 年，執筆畫下內在最真切的寧靜。",
      B: "輕微的波折只不過與生命賦予你的淬鍊，你比想像中更具韌性。願你繼續保持對世界的好奇，探索未知的解讀。",
      C: "在壓力的核心，你將學會與風暴共舞。這是一次靈魂的洗禮，祝福你在洗禮後迎來最閃耀的重生。",
      D: "陽光已經灑向你的沙漠，陰影正在退去。2026 年是屬於你的豐收季，請大膽地向內在深處探索，那裡有更多未竟的美麗。"
    };

    return `${openings[ego as keyof typeof openings]} ${core[social as keyof typeof core]} ${blessings[stress as keyof typeof blessings]} 這份沙漠繪畫僅是潛意識的冰山一角，還有更多未曾開啟的寶藏，正等待著你去細細解讀。`;
  }, [answers]);

  const handleStart = () => setPhase('QUIZ');

  const handleAnswer = (option: Option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentStep < QUIZ_DATA.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setPhase('RESULT');
    }
  };

  const handleBack = () => {
    if (phase === 'QUIZ') {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
        setAnswers(prev => prev.slice(0, -1));
      } else {
        setPhase('HOME');
        setAnswers([]);
      }
    } else if (phase === 'RESULT') {
      setPhase('QUIZ');
      setCurrentStep(QUIZ_DATA.length - 1);
      setAnswers(prev => prev.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setPhase('HOME');
    setCurrentStep(0);
    setAnswers([]);
  };

  const handleDownload = async () => {
    if (downloadCardRef.current === null) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(downloadCardRef.current, {
        cacheBust: true,
        backgroundColor: '#FDFCFB',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `Jubie_DesertCube_2026.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Download failed', err);
      alert('下載失敗，請嘗試手動截圖分享');
    } finally {
      setIsDownloading(false);
    }
  };

  const openLine = () => window.open(LINKS.LINE, '_blank');
  const openAnalysis = () => window.open('https://jubiewu.com/analysis/', '_blank');

  // 莫蘭迪沙漠色漸層類名 - 移除邊框以解決深色漏光問題
  const morandiGradientClass = "bg-gradient-to-r from-[#D4B982] via-[#A67C52] to-[#7A5C41]";
  const commonBtnClass = `flex items-center justify-center gap-2 px-8 py-4 ${morandiGradientClass} text-white font-bold rounded-full transition-all shadow-lg hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-sm tracking-widest border-none outline-none focus:outline-none focus:ring-0`;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#FDFCFB]">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=60&w=1200')`,
          opacity: 0.45,
          filter: 'blur(4px)'
        }}
      />
      
      <main className="relative z-10 w-full max-w-4xl px-4 md:px-8 py-8 md:py-12 flex flex-col items-center">
        {!imagesLoaded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FDFCFB]/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="animate-spin text-[#C5A059]" size={40} />
              <p className="text-[#8B4513] tracking-widest text-sm italic">正在走進沙漠...</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {phase === 'HOME' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white/30 backdrop-blur-xl border border-white/40 p-10 md:p-16 rounded-3xl shadow-2xl text-center flex flex-col items-center"
            >
              <motion.div animate={{ rotateY: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="mb-8">
                <Box size={64} color={COLORS.gold} strokeWidth={1} />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#2D2A26] tracking-widest leading-tight">沙漠立方體<br/><span className="text-2xl md:text-3xl font-light tracking-normal opacity-80">潛意識投射測驗</span></h1>
              <p className="text-lg text-[#8B4513] leading-relaxed mb-10 text-justify md:text-center max-w-lg">
                這是一個跨越時空、流傳已久的心理測驗。請放鬆你的呼吸，閉上雙眼，想像自己正處於一片無邊無際的沙漠中。這裡只有天、地、沙和你。
              </p>
              <button onClick={handleStart} className={`group relative px-12 py-4 ${morandiGradientClass} text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:scale-105 flex items-center gap-2 shadow-xl border-none outline-none focus:outline-none`}>
                走進沙漠 <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="mt-12 text-sm italic opacity-60 text-[#2D2A26]">「唯有在無人的荒野中，我們才能看見自己真實的模樣。」</p>
            </motion.div>
          )}

          {phase === 'QUIZ' && (
            <motion.div key={`quiz-${currentStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full max-w-4xl flex flex-col items-center">
              <div className="w-full max-w-md mb-6 px-4">
                <button onClick={handleBack} className="flex items-center gap-1 text-[#8B4513] opacity-60 hover:opacity-100 transition-opacity text-sm font-medium group border-none outline-none focus:outline-none">
                  <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 返回{currentStep === 0 ? '首頁' : '上一題'}
                </button>
              </div>
              <div className="mb-8 w-full max-w-md mx-auto px-4">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs uppercase tracking-widest text-[#8B4513] font-bold">Progress</span>
                  <span className="text-sm font-serif-en text-[#C5A059]">{currentStep + 1} / {QUIZ_DATA.length}</span>
                </div>
                <div className="h-1 w-full bg-[#F0EAD6] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${((currentStep + 1) / QUIZ_DATA.length) * 100}%` }} className="h-full bg-[#C5A059]" />
                </div>
              </div>
              <div className="text-center mb-10 px-4">
                <p className="text-lg text-[#8B4513] italic mb-4 opacity-80">{QUIZ_DATA[currentStep].guide}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26]">{QUIZ_DATA[currentStep].title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
                {QUIZ_DATA[currentStep].options.map((option) => (
                  <motion.button key={option.id} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(option)} className="group relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-lg border-none flex flex-col bg-white/10 outline-none focus:outline-none">
                    <div className="absolute inset-0 w-full h-full bg-[#F0EAD6]/50">
                      <img src={option.image} alt={option.text} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <div className="relative mt-auto p-6 text-left">
                      <span className="inline-block px-3 py-1 bg-[#C5A059]/90 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold rounded-full mb-3 shadow-sm">{option.id}</span>
                      <p className="text-white text-lg font-medium leading-snug drop-shadow-lg">{option.text}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === 'RESULT' && (
            <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-3xl bg-white/40 backdrop-blur-2xl border border-white/50 p-6 md:p-14 rounded-[3rem] shadow-2xl flex flex-col">
              <div className="w-full flex justify-start mb-6 md:mb-8">
                <button onClick={handleBack} className="flex items-center gap-1 text-[#8B4513] opacity-60 hover:opacity-100 transition-opacity text-xs uppercase tracking-widest font-bold group border-none outline-none focus:outline-none">
                  <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 修改最後選擇
                </button>
              </div>

              <div className="text-center mb-10">
                <h3 className="text-[#C5A059] uppercase tracking-[0.4em] text-xs font-bold mb-3">Psychological Insight</h3>
                <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A26]">你的潛意識沙漠地圖</h2>
              </div>

              {/* 極致優雅美化的精靈指引小卡 (恢復中文標題) */}
              <div className="mb-10 p-10 md:p-14 rounded-[3rem] bg-gradient-to-br from-[#FDFCFB] via-[#F6F1E6] to-[#EBE2D0] border border-[#C5A059]/20 shadow-inner relative overflow-hidden group text-center">
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity duration-1000">
                  <Sparkles size={120} className="text-[#7A5C41]" />
                </div>
                
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#A67C52]/40" />
                    <span className="text-sm md:text-lg font-bold tracking-[0.3em] text-[#7A5C41]/90 font-elegant">
                      2026 沙漠精靈的指引
                    </span>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#A67C52]/40" />
                  </div>

                  <div className="relative max-w-2xl w-full">
                    <Quote className="absolute -top-10 -left-10 text-[#A67C52]/5 rotate-180" size={80} />
                    <div className="pl-8 border-l-[1px] border-[#A67C52]/30 text-left">
                      <p className="text-[#4A3728] leading-[2.6] text-xl md:text-2xl font-elegant font-light letter-spacing-vibe text-justify">
                        {guidance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6 mb-12">
                {QUIZ_DATA.map((question, idx) => (
                  <div key={question.id} className="p-6 bg-white/30 rounded-2xl border border-white/40 shadow-sm">
                    <div className="flex items-center gap-3 mb-2"><div className="w-1.5 h-1.5 rounded-full bg-[#A67C52]" /><h4 className="text-sm font-bold text-[#8B4513] uppercase tracking-widest">{question.category}</h4></div>
                    <p className="text-[#2D2A26] leading-relaxed text-lg">{answers[idx]?.analysis}</p>
                  </div>
                ))}
              </div>

              {/* LINE 邀請卡片 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="mb-12 p-10 rounded-[2.5rem] border-2 border-dashed border-[#C5A059]/30 bg-[#FDFCFB]/60 flex flex-col items-center text-center shadow-inner"
              >
                <div className="w-14 h-14 bg-[#5E7161] rounded-full flex items-center justify-center text-white mb-6 shadow-xl">
                  <MessageCircle size={28} />
                </div>
                <h4 className="text-2xl font-bold text-[#2D2A26] mb-6 tracking-[0.2em]">靈魂的持續對話</h4>
                <div className="space-y-4 text-[#8B4513] text-sm leading-[1.8] max-w-lg mb-8">
                  <p>
                    居筆內在繪畫工作室相信創作可以顯現人們內在的真實，透過專業的繪畫解讀師，你將會發現潛意識一直想告訴你的訊息。
                  </p>
                  <p className="font-bold opacity-90">
                    我們邀請你加入 Jubie 居筆工作室的 LINE 官方帳號，即可獲取工作坊首次參與優惠券，每月還可以得到最新「內在繪畫主題」。
                  </p>
                </div>
                <button 
                  onClick={openLine}
                  style={{ backgroundColor: '#5E7161' }}
                  className="px-10 py-4 text-white font-bold rounded-full transition-all flex items-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 border-none outline-none focus:outline-none"
                >
                  <MessageCircle size={20} /> 領取專屬優惠與繪畫題目
                </button>
              </motion.div>

              <div className="action-buttons flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button onClick={resetQuiz} className={commonBtnClass}>
                    <RefreshCw size={18} />重新測驗
                  </button>
                  <button 
                    disabled={isDownloading} 
                    onClick={handleDownload} 
                    className={`${commonBtnClass} ${isDownloading ? 'opacity-70' : ''}`}
                  >
                    {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    {isDownloading ? '製作圖片中...' : '下載結果圖片'}
                  </button>
                </div>
                <button 
                  onClick={openAnalysis} 
                  className={`${commonBtnClass} w-full mt-4`}
                >
                  <Calendar size={20} />預約「深度內在繪畫解析」
                </button>
              </div>
              <p className="mt-12 text-center text-sm opacity-60 text-[#2D2A26] font-serif italic">「在無聲的荒漠中，聽見靈魂的迴響。」</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-8 text-[#8B4513] text-[10px] opacity-40 tracking-[0.3em] font-serif-en text-center">
        &copy; 2026 Jubie 居筆內在繪畫解讀工作室
      </footer>

      {/* Hidden Download Template (同步恢復中文標題) */}
      <div className="absolute top-[-9999px] left-[-9999px]">
        <div ref={downloadCardRef} style={{ width: '800px' }} className="bg-[#FDFCFB] p-20 flex flex-col items-center relative">
          <div className="absolute inset-8 border border-[#C5A059]/20" />
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#2D2A26] tracking-[0.4em] mb-4">沙漠立方體</h1>
            <p className="text-sm tracking-[0.6em] text-[#C5A059] opacity-80 uppercase font-elegant">The Inner Projection 2026</p>
          </div>
          
          <div className="w-full mb-14 p-16 rounded-[3rem] bg-gradient-to-br from-[#FDFCFB] via-[#F6F1E6] to-[#EBE2D0] border border-[#C5A059]/20 relative shadow-sm text-center">
            <div className="flex items-center justify-center gap-4 mb-10 text-[#7A5C41]">
              <div className="h-px w-12 bg-[#A67C52]/30" />
              <span className="text-2xl font-bold tracking-[0.4em] font-elegant">2026 沙漠精靈的指引</span>
              <div className="h-px w-12 bg-[#A67C52]/30" />
            </div>
            <div className="pl-10 border-l-[2px] border-[#A67C52]/20 text-left">
              <p className="text-[#4A3728] text-2xl font-elegant font-light leading-[2.6] letter-spacing-vibe">{guidance}</p>
            </div>
          </div>

          <div className="w-full space-y-12 mb-16">
            {QUIZ_DATA.map((question, idx) => (
              <div key={question.id} className="border-l-2 border-[#A67C52]/30 pl-10">
                <h4 className="text-sm font-bold text-[#A67C52] uppercase tracking-[0.4em] mb-4">{question.category}</h4>
                <p className="text-[#2D2A26] text-xl leading-relaxed">{answers[idx]?.analysis}</p>
              </div>
            ))}
          </div>
          
          <div style={{ backgroundColor: '#2D2A26' }} className="w-full mt-8 p-12 rounded-[3rem] flex items-center justify-between text-white shadow-2xl">
            <div className="flex-1 pr-10">
              <h5 style={{ color: '#D4B982' }} className="text-2xl font-bold mb-3 tracking-widest font-elegant">延續這場靈魂對話</h5>
              <p className="text-sm opacity-80 leading-relaxed font-serif italic">掃描右側加入 LINE，領取每月最新「內在繪畫主題」與工作坊優惠券。</p>
            </div>
            <div className="w-40 h-40 bg-white p-2 rounded-2xl flex items-center justify-center">
              <img src={LINKS.QR_CODE} alt="QR Code" className="w-full h-full" />
            </div>
          </div>

          <div className="mt-20 text-center">
            <p className="text-[#2D2A26] text-xs opacity-60 font-serif font-bold tracking-[0.4em]">© 2026 Jubie 居筆內在繪畫解讀工作室</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
