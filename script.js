let player = {
  name: "林晓宇",
  gender: "男",
  year: 2000,
  month: 1,
  age: 0,
  stage: "婴儿",
  face: 50,
  height: 180,
  body: 60,
  iq: 50,
  eq: 37,
  stamina: 67,
  weight: 94,
  happy: 100,
  money: 100,
  house: "0套",
  houseCap: 0,
  housePeople: 0,
  job: "无业",
  lover: null,
  marry: false,
  kids: 0,
  criminal: 0,
  alive: true
};

let currentEvent = null;

// ========== 性别与姓名生成 ==========
function randomGender() {
  return Math.random() > 0.5 ? "男" : "女";
}

function getDefaultName(gender) {
  return gender === "男" ? "林晓宇" : "林晓雨";
}

// ========== 时间与阶段 ==========
function nextMonth() {
  if (!player.alive) return;
  player.month++;
  if (player.month > 12) {
    player.month = 1;
    player.year++;
    player.age++;
  }
  updateStage();
  checkLifeEnd();
}

function updateStage() {
  let a = player.age;
  if (a < 3) player.stage = "婴儿";
  else if (a < 6) player.stage = "幼儿";
  else if (a < 12) player.stage = "童年";
  else if (a < 18) player.stage = "少年";
  else if (a < 30) player.stage = "青年";
  else if (a < 50) player.stage = "中年";
  else if (a < 70) player.stage = "老年前期";
  else player.stage = "晚年";
}

function checkLifeEnd() {
  if (player.body <= 0 || player.age >= 100) {
    player.alive = false;
  }
}

// ========== 事件库 ==========
const events = [
  {
    title: "小姐找上门",
    desc: "一个周末的下午，小芳抱着孩子来到你家。她看起来瘦了很多，眼睛里充满了疲惫。她说：'亲爱的，我们的孩子出生了。我试着自己抚养，但是太辛苦了。我想把孩子交给你，或者你给我20万抚养费。请你帮帮我吧。'看着她恳求的眼神，你不知道该怎么做。",
    options: [
      { name: "同意抚养", effect: () => { player.kids += 1; player.happy += 10; } },
      { name: "支付20万", effect: () => { player.money -= 200000; player.happy -= 15; } }
    ]
  },
  {
    title: "彩票中奖",
    desc: "你买的彩票中了500万，扣除税款后到手400万。",
    options: [
      { name: "收下奖金", effect: () => { player.money += 4000000; player.happy += 30; } },
      { name: "捐出一半", effect: () => { player.money += 2000000; player.happy += 20; } }
    ]
  },
  {
    title: "颜值被夸",
    desc: "出门逛街，陌生人夸你颜值很高。",
    condition: () => player.face >= 70,
    options: [
      { name: "礼貌感谢", effect: () => { player.charm += 5; player.happy += 10; } },
      { name: "傲娇无视", effect: () => { player.charm -= 5; player.happy += 5; } }
    ]
  },
  {
    title: "买房决策",
    desc: "你有足够的存款，考虑购置房产。",
    options: [
      { name: "买小公寓", effect: () => { player.money -= 5000; player.house = "1套(小公寓)"; player.happy += 20; } },
      { name: "再攒攒买大的", effect: () => { player.happy -= 5; player.money += 1000; } }
    ]
  },
  {
    title: "熬夜加班",
    desc: "公司项目紧急，需要熬夜加班。",
    options: [
      { name: "通宵完成", effect: () => { player.money += 500; player.body -= 10; player.happy -= 8; } },
      { name: "请假休息", effect: () => { player.money -= 200; player.body += 5; player.happy += 5; } }
    ]
  }
];

// ========== UI更新 ==========
function updateUI() {
  document.getElementById("name").innerText = player.name;
  document.getElementById("gender").innerText = player.gender;
  document.getElementById("age").innerText = player.age;
  document.getElementById("stage").innerText = player.stage;
  document.getElementById("face").innerText = player.face;
  document.getElementById("height").innerText = player.height;
  document.getElementById("body").innerText = player.body;
  document.getElementById("iq").innerText = player.iq;
  document.getElementById("eq").innerText = player.eq;
  document.getElementById("stamina").innerText = player.stamina;
  document.getElementById("weight").innerText = player.weight;
  document.getElementById("happy").innerText = player.happy;
  document.getElementById("money").innerText = player.money;
  document.getElementById("house").innerText = player.house;
  document.getElementById("house-cap").innerText = player.houseCap;
  document.getElementById("house-people").innerText = player.housePeople;
}

// ========== 弹窗逻辑 ==========
function showModal(event) {
  currentEvent = event;
  document.getElementById("modal-title").innerText = event.title;
  document.getElementById("modal-desc").innerText = event.desc;
  const btnContainer = document.getElementById("modal-buttons");
  btnContainer.innerHTML = "";
  event.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = i === 0 ? "btn-green" : "btn-orange";
    btn.innerText = opt.name;
    btn.onclick = () => modalOption(i);
    btnContainer.appendChild(btn);
  });
  document.getElementById("event-modal").classList.add("show");
}

function modalOption(index) {
  if (currentEvent && currentEvent.options[index]) {
    currentEvent.options[index].effect();
    updateUI();
  }
  // 关闭事件弹窗，不再自动弹出
  document.getElementById("event-modal").classList.remove("show");
}

// ========== 手动推进（核心修复） ==========
function nextMonthManually() {
  if (!player.alive) {
    showModal({
      title: "人生落幕",
      desc: "💀 你的人生已经结束。",
      options: []
    });
    return;
  }

  nextMonth();
  updateUI();
  
  // 筛选符合条件的事件
  let validEvents = events.filter(e => !e.condition || e.condition());
  if (validEvents.length > 0) {
    const nextEvent = validEvents[Math.floor(Math.random() * validEvents.length)];
    showModal(nextEvent);
  }
}

// ========== 页面导航 ==========
function showPage(page) {
  const navBtns = document.querySelectorAll(".nav-btn");
  navBtns.forEach(btn => btn.classList.remove("active"));
  if (event && event.target.closest(".nav-btn")) {
    event.target.closest(".nav-btn").classList.add("active");
  }
  alert(`切换到页面：${page}`);
}

// ========== 开局选择逻辑（核心新增） ==========
function startWithRandomGenderFromUI() {
  document.getElementById("start-modal").classList.remove("show");
  const gender = randomGender();
  initPlayer(gender);
}

function startWithFixedGenderFromUI(gender) {
  document.getElementById("start-modal").classList.remove("show");
  initPlayer(gender);
}

function initPlayer(gender) {
  player = {
    name: getDefaultName(gender),
    gender: gender,
    year: 2000, month: 1, age: 0, stage: "婴儿",
    face: 50, height: 180, body: 60, iq: 50, eq: 37, stamina: 67, weight: 94, happy: 100,
    money: 100, house: "0套", houseCap: 0, housePeople: 0,
    job: "无业", lover: null, marry: false, kids: 0, criminal: 0, alive: true
  };
  updateUI();
}

// 页面加载直接显示开局选择弹窗
window.onload = function() {};
