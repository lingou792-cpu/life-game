let player = {
  name: "林晓宇",
  gender: "男",
  year: 2000,
  month: 1,
  age: 0,
  stage: "婴儿",
  face: 50,
  height: 50,
  body: 60,
  iq: 30,
  eq: 10,
  stamina: 40,
  weight: 3,
  happy: 100,
  money: 1000,
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

// ========== 时间与阶段（严格对应） ==========
function nextMonth() {
  if (!player.alive) return;
  player.month++;
  if (player.month > 12) {
    player.month = 1;
    player.year++;
    player.age++;
    growAttributes();
  }
  updateStage();
  checkLifeEnd();
}

function growAttributes() {
  if (player.age < 18) {
    player.height += Math.floor(Math.random() * 10) + 5;
    player.weight += Math.floor(Math.random() * 3) + 2;
    player.iq += Math.floor(Math.random() * 5) + 3;
    player.body += 2;
  } else {
    if (player.age < 30) {
      player.body += 1;
    } else {
      player.body -= 1;
    }
  }
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

// ========== 核心：按年龄阶段分类的事件库 ==========
const events = {
  婴儿: [
    {
      title: "半夜哭闹",
      desc: "你半夜醒来，不停哭闹。",
      options: [
        { name: "妈妈哄睡", effect: () => { player.happy += 5; } },
        { name: "哭到累了睡", effect: () => { player.happy -= 5; player.body -= 2; } }
      ]
    },
    {
      title: "学翻身",
      desc: "妈妈教你学翻身，你能做到吗？",
      options: [
        { name: "努力尝试", effect: () => { player.body += 3; player.iq += 1; } },
        { name: "躺着不动", effect: () => { player.happy += 3; } }
      ]
    },
    {
      title: "辅食时间",
      desc: "到了吃辅食的时间，是吃甜的还是咸的？",
      options: [
        { name: "吃果泥", effect: () => { player.face += 1; player.happy += 2; } },
        { name: "吃米糊", effect: () => { player.body += 2; } }
      ]
    }
  ],
  幼儿: [
    {
      title: "上幼儿园",
      desc: "第一天去幼儿园，你很紧张。",
      options: [
        { name: "主动交友", effect: () => { player.eq += 2; } },
        { name: "躲在角落", effect: () => { player.happy -= 5; player.iq += 1; } }
      ]
    },
    {
      title: "抢玩具",
      desc: "小伙伴抢了你的玩具车。",
      options: [
        { name: "告诉老师", effect: () => { player.eq += 3; } },
        { name: "动手抢回", effect: () => { player.body += 2; player.happy -= 3; } }
      ]
    }
  ],
  童年: [
    {
      title: "小学数学考试",
      desc: "今天考数学，你复习了吗？",
      options: [
        { name: "认真做题", effect: () => { player.iq += 5; player.happy += 10; } },
        { name: "偷看同桌", effect: () => { player.iq -= 2; player.happy += 5; } }
      ]
    },
    {
      title: "零花钱",
      desc: "父母给了你10元零花钱。",
      options: [
        { name: "买漫画书", effect: () => { player.happy += 8; player.iq += 2; } },
        { name: "存起来", effect: () => { player.money += 10; player.eq += 3; } }
      ]
    }
  ],
  少年: [
    {
      title: "中考/高考",
      desc: "面临重要考试，压力巨大。",
      options: [
        { name: "通宵复习", effect: () => { player.iq += 10; player.body -= 5; player.happy -= 5; } },
        { name: "劳逸结合", effect: () => { player.iq += 5; player.happy += 5; } }
      ]
    },
    {
      title: "暗恋同桌",
      desc: "你偷偷暗恋同桌，想表白吗？",
      options: [
        { name: "写情书", effect: () => { player.eq += 5; player.happy += 8; } },
        { name: "藏在心里", effect: () => { player.iq += 3; player.happy -= 3; } }
      ]
    }
  ],
  青年: [
    {
      title: "大学毕业",
      desc: "大学毕业了，选择直接工作还是考研？",
      options: [
        { name: "直接工作", effect: () => { player.job = "职场新人"; player.money += 3000; } },
        { name: "考研深造", effect: () => { player.money -= 5000; player.iq += 15; } }
      ]
    },
    {
      title: "熬夜加班",
      desc: "公司项目上线，需要熬夜加班。",
      options: [
        { name: "通宵完成", effect: () => { player.money += 1000; player.body -= 8; player.happy -= 5; } },
        { name: "拒绝加班", effect: () => { player.job = "无业"; player.happy += 10; player.money -= 500; } }
      ]
    },
    {
      title: "买房决策",
      desc: "工作几年有了存款，考虑买房。",
      options: [
        { name: "买公寓", effect: () => { player.money -= 50000; player.house = "1套(公寓)"; player.happy += 20; } },
        { name: "继续租房", effect: () => { player.money += 5000; player.happy -= 5; } }
      ]
    },
    {
      title: "小姐找上门",
      desc: "一个周末的下午，小芳抱着孩子来到你家。她看起来瘦了很多，眼睛里充满了疲惫。她说：'亲爱的，我们的孩子出生了。我试着自己抚养，但是太辛苦了。我想把孩子交给你，或者你给我20万抚养费。请你帮帮我吧。'看着她恳求的眼神，你不知道该怎么做。",
      options: [
        { name: "同意抚养", effect: () => { player.kids += 1; player.happy += 5; player.money -= 2000; } },
        { name: "支付20万", effect: () => { player.money -= 200000; player.happy -= 15; } }
      ]
    }
  ],
  中年: [
    {
      title: "孩子上学",
      desc: "孩子要上小学了，选公立还是私立？",
      options: [
        { name: "公立学校", effect: () => { player.money -= 5000; } },
        { name: "私立学校", effect: () => { player.money -= 20000; } }
      ]
    },
    {
      title: "投资股票",
      desc: "朋友推荐一只股票，要不要买？",
      options: [
        { name: "稳健买入", effect: () => { player.money += 15000; player.happy += 10; } },
        { name: "梭哈一把", effect: () => { player.money -= 50000; player.happy -= 30; } }
      ]
    },
    {
      title: "体检",
      desc: "年度体检，发现血压有点高。",
      options: [
        { name: "健身减肥", effect: () => { player.body += 5; player.face += 2; } },
        { name: "无所谓", effect: () => { player.body -= 5; player.happy += 3; } }
      ]
    }
  ],
  老年: [
    {
      title: "退休了",
      desc: "到了退休年龄，终于可以休息了。",
      options: [
        { name: "带孙子", effect: () => { player.happy += 15; player.body -= 3; } },
        { name: "去旅游", effect: () => { player.money -= 10000; player.happy += 25; } }
      ]
    },
    {
      title: "广场舞",
      desc: "小区组织广场舞比赛，参加吗？",
      options: [
        { name: "积极参加", effect: () => { player.body += 5; } },
        { name: "在家看电视", effect: () => { player.happy += 5; player.body -= 2; } }
      ]
    }
  ]
};

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
  document.getElementById("event-modal").classList.remove("show");
}

// ========== 手动推进（核心：按阶段取事件） ==========
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
  
  let currentEvents = [];
  if (player.age < 3) currentEvents = events.婴儿;
  else if (player.age < 6) currentEvents = events.幼儿;
  else if (player.age < 12) currentEvents = events.童年;
  else if (player.age < 18) currentEvents = events.少年;
  else if (player.age < 30) currentEvents = events.青年;
  else if (player.age < 50) currentEvents = events.中年;
  else currentEvents = events.老年;

  if (currentEvents.length > 0) {
    const nextEvent = currentEvents[Math.floor(Math.random() * currentEvents.length)];
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

// ========== 开局选择逻辑 ==========
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
    face: 50, height: 50, body: 60, iq: 30, eq: 10, stamina: 40, weight: 3, happy: 100,
    money: 1000, house: "0套", houseCap: 0, housePeople: 0,
    job: "无业", }

// ========== 时间与阶段（严格对应） ==========
function nextMonth() {
  if (!player.alive) return;
  player.month++;
  if (player.month > 12) {
    player.month = 1;
    player.year++;
    player.age++;
    // 年龄增长带来的自然属性变化
    growAttributes();
  }
  updateStage();
  checkLifeEnd();
}

// 自然生长逻辑：什么年纪长什么属性
function growAttributes() {
  if (player.age < 18) {
    player.height += Math.floor(Math.random() * 10) + 5; // 未成年快速长高
    player.weight += Math.floor(Math.random() * 3) + 2;  // 未成年增重
    player.iq += Math.floor(Math.random() * 5) + 3;      // 未成年智商快速提升
    player.body += 2;                                    // 体质增强
  } else {
    player.height = player.height; // 18岁后身高定型
    if (player.age < 30) {
      player.body += 1;
    } else {
      player.body -= 1; // 30岁后体质开始下降
    }
  }
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

// ========== 核心：按年龄阶段分类的事件库 ==========
const events = {
  // 0-2岁：婴儿期（吃喝拉撒、父母互动）
  婴儿: [
    {
      title: "半夜哭闹",
      desc: "你半夜醒来，不停哭闹。",
      options: [
        { name: "妈妈哄睡", effect: () => { player.happy += 5; player.parents = (player.parents || 100) + 3; } },
        { name: "哭到累了睡", effect: () => { player.happy -= 5; player.body -= 2; } }
      ]
    },
    {
      title: "学翻身",
      desc: "妈妈教你学翻身，你能做到吗？",
      options: [
        { name: "努力尝试", effect: () => { player.body += 3; player.iq += 1; } },
        { name: "躺着不动", effect: () => { player.happy += 3; } }
      ]
    },
    {
      title: "辅食时间",
      desc: "到了吃辅食的时间，是吃甜的还是咸的？",
      options: [
        { name: "吃果泥", effect: () => { player.face += 1; player.happy += 2; } },
        { name: "吃米糊", effect: () => { player.body += 2; } }
      ]
    }
  ],

  // 3-5岁：幼儿期（幼儿园、玩具、小伙伴）
  幼儿: [
    {
      title: "上幼儿园",
      desc: "第一天去幼儿园，你很紧张。",
      options: [
        { name: "主动交友", effect: () => { player.friends = (player.friends || 0) + 2; player.eq += 2; } },
        { name: "躲在角落", effect: () => { player.happy -= 5; player.iq += 1; } }
      ]
    },
    {
      title: "抢玩具",
      desc: "小伙伴抢了你的玩具车。",
      options: [
        { name: "告诉老师", effect: () => { player.eq += 3; } },
        { name: "动手抢回", effect: () => { player.body += 2; player.happy -= 3; } }
      ]
    }
  ],

  // 6-11岁：童年（小学、考试、零花钱）
  童年: [
    {
      title: "小学数学考试",
      desc: "今天考数学，你复习了吗？",
      options: [
        { name: "认真做题", effect: () => { player.iq += 5; player.happy += 10; } },
        { name: "偷看同桌", effect: () => { player.iq -= 2; player.happy += 5; } }
      ]
    },
    {
      title: "零花钱",
      desc: "父母给了你10元零花钱。",
      options: [
        { name: "买漫画书", effect: () => { player.happy += 8; player.iq += 2; } },
        { name: "存起来", effect: () => { player.money += 10; player.eq += 3; } }
      ]
    }
  ],

  // 12-17岁：少年（中学、暗恋、叛逆）
  少年: [
    {
      title: "中考/高考",
      desc: "面临重要考试，压力巨大。",
      options: [
        { name: "通宵复习", effect: () => { player.iq += 10; player.body -= 5; player.happy -= 5; } },
        { name: "劳逸结合", effect: () => { player.iq += 5; player.happy += 5; } }
      ]
    },
    {
      title: "暗恋同桌",
      desc: "你偷偷暗恋同桌，想表白吗？",
      options: [
        { name: "写情书", effect: () => { player.eq += 5; player.happy += 8; } },
        { name: "藏在心里", effect: () => { player.iq += 3; player.happy -= 3; } }
      ]
    }
  ],

  // 18-29岁：青年（大学、工作、恋爱、买房买车）
  青年: [
    {
      title: "大学毕业",
      desc: "大学毕业了，选择直接工作还是考研？",
      options: [
        { name: "直接工作", effect: () => { player.job = "职场新人"; player.money += 3000; player.education = 4; } },
        { name: "考研深造", effect: () => { player.money -= 5000; player.iq += 15; player.education = 5; } }
      ]
    },
    {
      title: "熬夜加班",
      desc: "公司项目上线，需要熬夜加班。",
      options: [
        { name: "通宵完成", effect: () => { player.money += 1000; player.body -= 8; player.happy -= 5; } },
        { name: "拒绝加班", effect: () => { player.job = "无业"; player.happy += 10; player.money -= 500; } }
      ]
    },
    {
      title: "买房决策",
      desc: "工作几年有了存款，考虑买房。",
      options: [
        { name: "买公寓", effect: () => { player.money -= 50000; player.house = "1套(公寓)"; player.happy += 20; } },
        { name: "继续租房", effect: () => { player.money += 5000; player.happy -= 5; } }
      ]
    },
    {
      title: "小姐找上门",
      desc: "一个周末的下午，小芳抱着孩子来到你家...",
      options: [
        { name: "同意抚养", effect: () => { player.kids += 1; player.happy += 5; player.money -= 2000; } },
        { name: "支付20万", effect: () => { player.money -= 200000; player.happy -= 15; } }
      ]
    }
  ],

  // 30-49岁：中年（婚姻、孩子教育、投资、健康）
  中年: [
    {
      title: "孩子上学",
      desc: "孩子要上小学了，选公立还是私立？",
      options: [
        { name: "公立学校", effect: () => { player.money -= 5000; player.kids += (player.kids || 0) * 0.1; } },
        { name: "私立学校", effect: () => { player.money -= 20000; player.kids += (player.kids || 0) * 0.3; } }
      ]
    },
    {
      title: "投资股票",
      desc: "朋友推荐一只股票，要不要买？",
      options: [
        { name: "稳健买入", effect: () => { player.money += 15000; player.happy += 10; } },
        { name: "梭哈一把", effect: () => { player.money -= 50000; player.happy -= 30; } }
      ]
    },
    {
      title: "体检",
      desc: "年度体检，发现血压有点高。",
      options: [
        { name: "健身减肥", effect: () => { player.body += 5; player.face += 2; } },
        { name: "无所谓", effect: () => { player.body -= 5; player.happy += 3; } }
      ]
    }
  ],

  // 50岁+：老年（退休、带孙子、健康问题）
  老年: [
    {
      title: "退休了",
      desc: "到了退休年龄，终于可以休息了。",
      options: [
        { name: "带孙子", effect: () => { player.happy += 15; player.body -= 3; } },
        { name: "去旅游", effect: () => { player.money -= 10000; player.happy += 25; } }
      ]
    },
    {
      title: "广场舞",
      desc: "小区组织广场舞比赛，参加吗？",
      options: [
        { name: "积极参加", effect: () => { player.body += 5; player.friends = (player.friends || 0) + 5; } },
        { name: "在家看电视", effect: () => { player.happy += 5; player.body -= 2; } }
      ]
    }
  ]
};

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
  document.getElementById("event-modal").classList.remove("show");
}

// ========== 手动推进（核心：按阶段取事件） ==========
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
  
  // 关键逻辑：根据当前阶段获取对应事件
  let currentEvents = [];
  if (player.age < 3) currentEvents = events.婴儿;
  else if (player.age < 6) currentEvents = events.幼儿;
  else if (player.age < 12) currentEvents = events.童年;
  else if (player.age < 18) currentEvents = events.少年;
  else if (player.age < 30) currentEvents = events.青年;
  else if (player.age < 50) currentEvents = events.中年;
  else currentEvents = events.老年;

  // 随机选一个事件弹出
  if (currentEvents.length > 0) {
    const nextEvent = currentEvents[Math.floor(Math.random() * currentEvents.length)];
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
  a}

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
