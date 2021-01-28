'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > h2 ')
  const scoreText = document.querySelector('#result > p ')

  const quizeSet = shuffle ([
    {q: '人工知能を英語で？', c: ['Artificial intelligence', 'Habit time', 'Eiji kotouge', 'Web internet',]},
    {q: 'アメリカ合衆国を英語で？', c: ['USA', 'USJ', 'TKO', 'HIS',]},
    {q: '日本の初代内閣総理大臣といえば？', c: ['伊藤博文', '安倍晋三', '野口英世', '織田信長',]},
    {q: 'ジョジョの奇妙な冒険の第2部の主人公は？', c: ['ジョセフジョースター', 'ジョルノジョバーナ', '空条承太郎', 'リンドンジョンソン',]},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] =  [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if(li.textContent === quizeSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;
    question.textContent = quizeSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
  
    const shuffledChoices = shuffle([...quizeSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizeSet.length - 1) {
      btn.textContent = '点数を確認';
    }
  }
  setQuiz();

  btn.addEventListener ('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizeSet.length - 1) {
      scoreLabel.textContent = `点数: ${score} / ${quizeSet.length}`;
      result.classList.remove('hidden')
    } else {
      currentNum++;
      setQuiz();
    }

    if (score > 3) {
      scoreText.textContent = 'おめでとうございます！'
    } else  if (score > 2 ){
      scoreText.textContent = '惜しいですね'
    } else if(score > 0){
      scoreText.textContent = '頑張りましょう！'
    } else {
      scoreText.textContent = 'まだまだだな'
    }

  });
}