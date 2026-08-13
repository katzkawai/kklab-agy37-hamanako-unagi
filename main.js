/**
 * 浜名湖うなぎ (Lake Hamana Eel) - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCraftTabs();
  initDiagnoser();
  initQuiz();
});

/* ==========================================================================
   1. Header Navigation & Mobile Menu
   ========================================================================== */
function initHeader() {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   2. Kanto vs Kansai Tab Switcher
   ========================================================================== */
function initCraftTabs() {
  const tabs = document.querySelectorAll('.comp-tab');
  const panels = document.querySelectorAll('.comp-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');

      // Update tabs state
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels state
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === targetId) {
          p.classList.add('active');
        }
      });
    });
  });
}

/* ==========================================================================
   3. Interactive Dish Finder (食べ方診断)
   ========================================================================== */
function initDiagnoser() {
  const q1Step = document.getElementById('diag-q1');
  const q2Step = document.getElementById('diag-q2');
  const resultCard = document.getElementById('diag-result');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const resultTip = document.getElementById('result-tip');
  const retryBtn = document.getElementById('diag-retry');

  let selectedQ1 = null;
  let selectedQ2 = null;

  const q1Btns = q1Step.querySelectorAll('.diag-btn');
  const q2Btns = q2Step.querySelectorAll('.diag-btn');

  // Question 1 click
  q1Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedQ1 = btn.getAttribute('data-val');
      q1Step.style.display = 'none';
      q2Step.style.display = 'block';
    });
  });

  // Question 2 click
  q2Btns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedQ2 = btn.getAttribute('data-val');
      q2Step.style.display = 'none';
      renderDiagnoseResult(selectedQ1, selectedQ2);
    });
  });

  // Retry
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      selectedQ1 = null;
      selectedQ2 = null;
      resultCard.style.display = 'none';
      q2Step.style.display = 'none';
      q1Step.style.display = 'block';
    });
  }

  function renderDiagnoseResult(q1, q2) {
    resultCard.style.display = 'block';

    if (q1 === 'classic' && q2 === 'soft') {
      resultTitle.textContent = '「関東風 上うな重（背開き・蒸し）」';
      resultDesc.textContent = 'ふっくらとろける江戸前の蒸し技と、甘辛い秘伝ダレが染み込んだ熱々のご飯。王道のうな重の感動を最も素直に堪能できる至高の一膳です。';
      resultTip.innerHTML = '💡 <strong>おすすめの味わい方:</strong> 肝吸いと奈良漬を添えて、まずはそのまま一口。後半はお好みで挽きたての粉山椒をひと振り！';
    } else if (q1 === 'classic' && q2 === 'crispy') {
      resultTitle.textContent = '「関西風 地焼きうな重（腹開き・直火）」';
      resultDesc.textContent = '蒸さずに備長炭の強火で一気に香ばしく焼き上げた関西風！皮はパリッとクリスピーで、噛むほどに上質な脂の旨みが口いっぱいに広がります。';
      resultTip.innerHTML = '💡 <strong>おすすめの味わい方:</strong> 皮目のカリッとした食感を損なわないよう、熱いうちに豪快に頬張るのが醍醐味です！';
    } else if (q1 === 'gourmet') {
      resultTitle.textContent = '「浜名湖名物 白焼（しらやき）御膳」';
      resultDesc.textContent = 'タレをつけずに素焼きした白焼は、南アルプス地下水で泥抜きされた浜名湖うなぎだからこそ可能な極上の逸品。素材本来の甘みと上品な脂を堪能できます。';
      resultTip.innerHTML = '💡 <strong>おすすめの味わい方:</strong> 生わさび醤油、岩塩、すだち絞りで。静岡の銘酒（純米大吟醸など）と合わせると昇天ものの美味さ覚醒！';
    } else {
      resultTitle.textContent = '「名物 浜名湖ひつまぶし御膳」';
      resultDesc.textContent = '一口目はそのまま、二口目はネギ・わさび・海苔の薬味で、三口目は熱々の特製お出汁でお茶漬けに。一度で三つの美味を楽しめる贅沢の極みです。';
      resultTip.innerHTML = '💡 <strong>おすすめの味わい方:</strong> お出汁をかける時はわさびを少し多めに溶かすと、うなぎの脂と出汁の香りが最高に引き立ちます。';
    }
  }
}

/* ==========================================================================
   4. Hamana Eel Interactive Quiz (浜名湖うなぎ検定)
   ========================================================================== */
function initQuiz() {
  const quizData = [
    {
      question: "浜名湖で日本初となるシラスウナギの人工養殖に成功した人物は誰？",
      options: [
        "服部 倉治郎（はっとり くらじろう）",
        "徳川 家康（とくがわ いえやす）",
        "平賀 源内（ひらが げんない）",
        "山葉 寅楠（やまは とらくす）"
      ],
      correctIndex: 0,
      explanation: "正解は「服部 倉治郎」です。明治33年（1900年）、浜名湖畔に約7ヘクタールの養鰻池を造り、近代養鰻業の礎を築きました。"
    },
    {
      question: "浜名湖うなぎが出荷前に数日間地下水で泳がされる「泥抜き」の施設を何と呼ぶ？",
      options: [
        "生簀（いけす）",
        "立場（たてば）",
        "水門（すいもん）",
        "水槽（すいそう）"
      ],
      correctIndex: 1,
      explanation: "正解は「立場（たてば）」です。南アルプスや天竜川水系の冷たく清らかな地下水を絶えず打たせることで、泥臭さを完全に消し、身を引き締めます。"
    },
    {
      question: "浜松・浜名湖地域のうなぎ文化の最大の特徴として正しいものは？",
      options: [
        "関東風（背開き・蒸し）しか存在しない",
        "関西風（腹開き・地焼き）しか存在しない",
        "関東風と関西風の両方の名店が共存している",
        "うなぎの蒲焼は食べず、白焼しか食べない"
      ],
      correctIndex: 2,
      explanation: "正解は「関東風と関西風の両方の名店が共存している」です。東西の文化が交わる浜松ならではの奇跡的な食文化です。"
    },
    {
      question: "タレをつけずに素焼きにし、生わさびや塩で素材本来の味を楽しむ料理は？",
      options: [
        "蒲焼（かばやき）",
        "白焼（しらやき）",
        "ひつまぶし",
        "うざく"
      ],
      correctIndex: 1,
      explanation: "正解は「白焼（しらやき）」です。水と素材が良い浜名湖だからこそ臭みがなく、魚本来の甘みと上質な脂が引き立ちます。"
    }
  ];

  let currentQuestion = 0;
  let score = 0;

  const countDisplay = document.getElementById('quiz-count');
  const scoreDisplay = document.getElementById('quiz-score-display');
  const progressFill = document.getElementById('quiz-progress');
  const questionText = document.getElementById('quiz-question');
  const optionsContainer = document.getElementById('quiz-options');
  const feedbackArea = document.getElementById('quiz-feedback');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackDesc = document.getElementById('feedback-desc');
  const nextBtn = document.getElementById('btn-next-question');
  const certCard = document.getElementById('quiz-certificate');
  const certGrade = document.getElementById('cert-rank');
  const certScore = document.getElementById('cert-final-score');
  const restartBtn = document.getElementById('btn-restart-quiz');
  const questionCard = document.querySelector('.quiz-question-card');

  function renderQuestion() {
    feedbackArea.style.display = 'none';
    feedbackArea.className = 'quiz-feedback';
    
    const q = quizData[currentQuestion];
    countDisplay.textContent = `第 ${currentQuestion + 1} 問 / 全 ${quizData.length} 問`;
    scoreDisplay.textContent = `現在のスコア: ${score} 点`;
    progressFill.style.width = `${((currentQuestion + 1) / quizData.length) * 100}%`;
    questionText.textContent = q.question;

    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `
        <span class="option-letter">${letters[index]}</span>
        <span>${optText}</span>
      `;
      btn.addEventListener('click', () => handleAnswer(index));
      optionsContainer.appendChild(btn);
    });
  }

  function handleAnswer(selectedIndex) {
    const q = quizData[currentQuestion];
    const optionBtns = optionsContainer.querySelectorAll('.quiz-option-btn');
    
    // Disable all options
    optionBtns.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === q.correctIndex;
    if (isCorrect) {
      score++;
      scoreDisplay.textContent = `現在のスコア: ${score} 点`;
      feedbackArea.classList.add('correct');
      feedbackTitle.textContent = '🎉 大正解！見事です！';
    } else {
      feedbackArea.classList.add('incorrect');
      feedbackTitle.textContent = '残念…！惜しい！';
    }

    feedbackDesc.textContent = q.explanation;
    feedbackArea.style.display = 'block';

    if (currentQuestion >= quizData.length - 1) {
      nextBtn.textContent = '結果・認定証を見る';
    } else {
      nextBtn.textContent = '次の問題へ進む';
    }
  }

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      renderQuestion();
    } else {
      showCertificate();
    }
  });

  function showCertificate() {
    questionCard.style.display = 'none';
    feedbackArea.style.display = 'none';
    certCard.style.display = 'block';

    let rank = '浜名湖うなぎ大達人（マスター）';
    if (score === 4) {
      rank = '極・浜名湖うなぎ大達人（最高位免許皆伝）';
    } else if (score >= 2) {
      rank = '浜名湖うなぎ愛好家（上級者）';
    } else {
      rank = '浜名湖うなぎビギナー（見習い）';
    }

    certGrade.textContent = `獲得称号: ${rank}`;
    certScore.textContent = `最終得点: ${score} / ${quizData.length} 点（正解率 ${Math.round((score / quizData.length) * 100)}%）`;
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      certCard.style.display = 'none';
      questionCard.style.display = 'block';
      renderQuestion();
    });
  }

  // Initial load
  if (questionText) {
    renderQuestion();
  }
}
