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

// ========== 事件库（包含你要求的所有内容） ==========
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
    title: "嫖娼被抓",
    desc: "你因嫖娼被警方突袭抓获。",
    options: [
      { name: "交罚款释放", effect: () => { player.money -= 800; player.criminal = 1; player.happy -= 40; } },
      { name: "拒绝认罚→拘留", effect: () => { player.criminal = 2; player.happy -= 60; player.body -= 15; } }
    ]
  },
  {
    title: "整容",
    desc: "你去医院进行了整容手术。",
    options: [
      { name: "微整", effect: () => { player.face += 15; player.money -= 1000; player.happy += 20; } },
      { name: "大整", effect: () => { player.face += 30; player.money -= 3000; player.body -= 5; player.happy += 30; } }
    ]
  },
  {
    title: "买房",
    desc: "你考虑购置房产。",
    options: [
      { name: "小公寓", effect: () => { player.money -= 5000; player.house = "小公寓"; player.happy += 20; } },
      { name: "大住宅", effect: () => { player.money -= 12000; player.house = "大户型"; player.happy += 35; } }
    ]
  },
  {
    title: "车祸",
    desc: "你遭遇了严重的车祸。",
    options: [
      { name: "轻伤", effect: () => { player.body -= 20; player.money -= 500; player.happy -= 25; } },
      { name: "重伤", effect: () => { player.body -= 50; player.money -= 1500; player.happy -= 40; } }
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
    nextMonth();
    updateUI();
  }
  document.getElementById("event-modal").classList.remove("show");
  setTimeout(() => {
    if (player.alive) {
      const nextEvent = events[Math.floor(Math.random() * events.length)];
      showModal(nextEvent);
    } else {
      document.getElementById("modal-title").innerText = "人生落幕";
      document.getElementById("modal-desc").innerText = "💀 你的人生已经结束。";
      document.getElementById("modal-buttons").innerHTML = "";
      document.getElementById("event-modal").classList.add("show");
    }
  }, 1000);
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

// ========== 游戏开始（两种模式） ==========
function startWithRandomGender() {
  const gender = randomGender();
  player = {
    name: getDefaultName(gender),
    gender: gender,
    year: 2000, month: 1, age: 0, stage: "婴儿",
    face: 50, height: 180, body: 60, iq: 50, eq: 37, stamina: 67, weight: 94, happy: 100,
    money: 100, house: "0套", houseCap: 0, housePeople: 0,
    job: "无业", lover: null, marry: false, kids: 0, criminal: 0, alive: true
  };
  updateUI();
  const firstEvent = events[Math.floor(Math.random() * events.length)];
  showModal(firstEvent);
}

function startWithFixedGender(fixedGender) {
  if (fixedGender !== "男" && fixedGender !== "女") {
    console.error("性别必须是'男'或'女'");
    return;
  }
  player = {
    name: getDefaultName(fixedGender),
    gender: fixedGender,
    year: 2000, month: 1, age: 0, stage: "婴儿",
    face: 50, height: 180, body: 60, iq: 50, eq: 37, stamina: 67, weight: 94, happy: 100,
    money: 100, house: "0套", houseCap: 0, housePeople: 0,
    job: "无业", lover: null, marry: false, kids: 0, criminal: 0, alive: true
  };
  updateUI();
  const firstEvent = events[Math.floor(Math.random() * events.length)];
  showModal(firstEvent);
}

// 默认使用随机性别模式
function start() {
  startWithRandomGender();
}

window.onload = start;
