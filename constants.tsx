
import { Question } from './types';

export const COLORS = {
  gold: '#C5A059',
  cream: '#FDFCFB',
  earth: '#8B4513',
  dark: '#2D2A26',
  pearl: '#F0EAD6'
};

export const QUIZ_DATA: Question[] = [
  {
    id: 1,
    category: '自我認知 (Ego)',
    guide: '「在這片沙漠中， you see a cube. Please observe it carefully.」',
    title: '這個立方體是大是小？是什麼材質做的？',
    options: [
      {
        id: 'A',
        text: '巨大的石頭 or 金屬，不透明',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5492.jpg',
        analysis: '自尊心強、意志堅定，但也可能較為固執、防備心重。你渴望展現強大的形象。'
      },
      {
        id: 'B',
        text: '透明的玻璃 or 水晶，折射出彩虹',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5493.jpg',
        analysis: '內心純粹、坦誠，容易被看透。你是一個真誠的人，但有時會覺得自己有些脆弱。'
      },
      {
        id: 'C',
        text: '懸浮空中的發光體，充滿能量',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5494.jpg',
        analysis: '理想主義者，思維天馬行空，可能有點不切實際，重視精神世界勝過物質。'
      },
      {
        id: 'D',
        text: '木頭 or 塑膠製，感覺陳舊滄桑',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5495.jpg',
        analysis: '務實、謙虛，重視經歷與回憶。你接納自己的不完美。'
      }
    ]
  },
  {
    id: 2,
    category: '人際關係 (Social)',
    guide: '「接著，你在立方體附近看到了一個梯子。」',
    title: '梯子與立方體的關係是？',
    options: [
      {
        id: 'A',
        text: '梯子靠在立方體上',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5496.jpg',
        analysis: '你依賴朋友，或者朋友依賴你。你喜歡緊密的社交連結，朋友是你的支撐。'
      },
      {
        id: 'B',
        text: '梯子獨立站立，保持距離',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5497.jpg',
        analysis: '你與朋友保持君子之交，重視彼此的界線與獨立性。'
      },
      {
        id: 'C',
        text: '梯子高入雲霄，俯視立方體',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5499.jpg',
        analysis: '你敬重你的社交圈，朋友通常比你年長或地位較高，你喜歡和強者交流。'
      },
      {
        id: 'D',
        text: '梯子橫躺沙地，被埋了一半',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5500.jpg',
        analysis: '你目前可能感到孤獨，或者覺得社交讓你疲憊，想暫時切斷連結。'
      }
    ]
  },
  {
    id: 3,
    category: '伴侶與愛慾 (Libido)',
    guide: '「這時，沙漠中出現了一匹馬。」',
    title: '這匹馬的狀態如何？',
    options: [
      {
        id: 'A',
        text: '安靜地待在立方體旁吃草',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5501.jpg',
        analysis: '你渴望穩定、顧家、溫柔的伴侶。你在關係中尋求安全感。'
      },
      {
        id: 'B',
        text: '奔跑中的野馬，在遠處奔跑',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5502.jpg',
        analysis: '你喜歡有個性、自由奔放的伴侶。你在關係中重視激情與空間，不喜歡被束縛。'
      },
      {
        id: 'C',
        text: '被拴在立方體或梯子上',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5503.jpg',
        analysis: '你在感情中有較強的控制欲，或者你感覺被目前的關係束縛住了。'
      },
      {
        id: 'D',
        text: '看起來瘦弱、疲憊，緩慢行走',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5505.jpg',
        analysis: '這投射了你目前對感情的無力感，或者你的伴侶正處於低潮期。'
      }
    ]
  },
  {
    id: 4,
    category: '創造力與守護 (Creation)',
    guide: '「你在沙漠中發現了一些花朵。」',
    title: '花朵的數量與位置是？',
    options: [
      {
        id: 'A',
        text: '只有一朵，開在立方體上',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5506.jpg',
        analysis: '你專注於唯一的目標 or 摯愛，重質不重量。'
      },
      {
        id: 'B',
        text: '一小簇，在立方體陰影下',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5507.jpg',
        analysis: '你有很強的保護欲，希望為你的創造物提供遮風避雨的環境。'
      },
      {
        id: 'C',
        text: '遍地開花，立方體周圍全都是',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5509.jpg',
        analysis: '你創造力豐沛，渴望將你的愛 or 作品散播給大眾，喜歡熱鬧。'
      },
      {
        id: 'D',
        text: '幾乎都是枯枝 or 零星乾燥花瓣',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5510.jpg',
        analysis: '你目前靈感枯竭，或者對培育下一代/創作感到焦慮乏力。'
      }
    ]
  },
  {
    id: 5,
    category: '當下壓力 (Stress)',
    guide: '「最後，你抬頭看向遠方，發現一場風暴正在接近。」',
    title: '風暴現在在哪裡？',
    options: [
      {
        id: 'A',
        text: '風暴非常遠，只看得到地平線',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5511.jpg',
        analysis: '你的生活目前很平靜，壓力對你來說還很遙遠，或者你選擇忽視它。'
      },
      {
        id: 'B',
        text: '風暴正在經過，稍微有影響',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5512.jpg',
        analysis: '你正在經歷一些挑戰，但你認為這是可控的，不會摧毀你的生活。'
      },
      {
        id: 'C',
        text: '風暴處於正上方，正在肆虐',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5513.jpg',
        analysis: '你正處於巨大的壓力核心，可能感到焦慮、甚至崩潰邊緣。你需要休息與釋放。'
      },
      {
        id: 'D',
        text: '沒有風暴，天氣晴朗或已結束',
        image: 'https://jubiewu.com/wp-content/uploads/2026/01/IMG_5514.jpg',
        analysis: '你剛度過一個難關，現在是重生的時刻，心態非常豁達。'
      }
    ]
  }
];
