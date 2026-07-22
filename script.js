// ========== 语言切换逻辑 ==========
let isCN = true;
const langBtn = document.getElementById("langBtn");
function switchLang() {
    isCN = !isCN;
    langBtn.innerText = isCN ? "English" : "中文";
    document.documentElement.lang = isCN ? "zh-CN" : "en";
    document.title = isCN ? "在线多功能工具箱" : "Free Online Tools";

    document.querySelectorAll("[data-zh]").forEach(el => {
        el.innerText = isCN ? el.dataset.zh : el.dataset.en;
    })
}
langBtn.onclick = switchLang;

// ========== 工具面板切换 ==========
const 所有工具标签 = document.querySelectorAll(".工具标签");
const 所有工具面板 = document.querySelectorAll(".工具面板");
所有工具标签.forEach(标签 => {
    标签.addEventListener("click", () => {
        const 工具名称 = 标签.dataset.tool;
        所有工具标签.forEach(t => t.classList.remove("激活"));
        所有工具面板.forEach(p => p.classList.remove("显示"));
        标签.classList.add("激活");
        document.querySelector(`.${工具名称}`).classList.add("显示");
    })
})

// ========== 秒表计时器 ==========
function 转时分秒(总秒数) {
    let h = Math.floor(总秒数 / 3600);
    let m = Math.floor((总秒数 % 3600) / 60);
    let s = 总秒数 % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
let 计时定时器 = null;
let 计时秒数 = 0;
const 计时文字 = document.getElementById("计时显示");
document.getElementById("计时开始").onclick = () => {
    clearInterval(计时定时器);
    计时定时器 = setInterval(() => {
        计时秒数++;
        计时文字.innerText = 转时分秒(计时秒数);
    }, 1000)
}
document.getElementById("计时暂停").onclick = () => clearInterval(计时定时器);
document.getElementById("计时重置").onclick = () => {
    clearInterval(计时定时器);
    计时秒数 = 0;
    计时文字.innerText = "00:00:00";
}

// ========== 计算器 ==========
const 输入框 = document.getElementById("计算输入框");
document.querySelectorAll(".计算按键区 button").forEach(按键 => {
    按键.onclick = () => {
        const 文字 = 按键.innerText;
        if (文字 === (isCN ? "清空" : "Clear")) {
            输入框.value = "";
        } else if (文字 === "=") {
            try {
                输入框.value = eval(输入框.value);
            } catch {
                输入框.value = isCN ? "错误" : "Error";
            }
        } else {
            输入框.value += 文字;
        }
    }
})

// ========== 随机数 ==========
const 最小输入 = document.getElementById("最小值");
const 最大输入 = document.getElementById("最大值");
const 随机数字框 = document.getElementById("随机数字");
document.getElementById("生成按钮").onclick = () => {
    let min = Number(最小输入.value);
    let max = Number(最大输入.value);
    if(min >= max) {
        随机数字框.innerText = isCN ? "数值错误" : "Wrong Range";
        return;
    }
    const 结果 = Math.floor(Math.random() * (max - min + 1)) + min;
    随机数字框.innerText = 结果;
}

// ========== 密码生成器 ==========
document.getElementById("createPwd").onclick = ()=>{
    const len = Number(document.getElementById("pwdLen").value);
    const hasNum = document.getElementById("pwdNum").checked;
    const hasUpper = document.getElementById("pwdUpper").checked;
    const hasLower = document.getElementById("pwdLower").checked;
    const hasSym = document.getElementById("pwdSym").checked;
    let pool = "";
    if(hasNum) pool += "0123456789";
    if(hasUpper) pool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(hasLower) pool += "abcdefghijklmnopqrstuvwxyz";
    if(hasSym) pool += "!@#$%^&*()_+-=";
    const pwdOutput = document.getElementById("pwdOutput");
    if(pool.length === 0){
        pwdOutput.innerText = isCN ? "至少选择一种字符" : "Select at least one";
        return;
    }
    let pwd = "";
    for(let i=0;i<len;i++){
        pwd += pool[Math.floor(Math.random()*pool.length)];
    }
    pwdOutput.innerText = pwd;
}

// ========== 长度单位换算 ==========
function getMeter(val,unit){
    switch(unit){
        case "km": return val * 1000;
        case "cm": return val / 100;
        case "inch": return val * 0.0254;
        case "ft": return val * 0.3048;
        default: return val;
    }
}
function fromMeter(val,unit){
    switch(unit){
        case "km": return val / 1000;
        case "cm": return val * 100;
        case "inch": return val / 0.0254;
        case "ft": return val / 0.3048;
        default: return val;
    }
}
document.getElementById("calcUnit").onclick = ()=>{
    const num = Number(document.getElementById("unitNum").value);
    const u1 = document.getElementById("unitFrom").value;
    const u2 = document.getElementById("unitTo").value;
    const resBox = document.getElementById("unitResult");
    if(isNaN(num)){
        resBox.innerText = isCN ? "请输入数字" : "Input Number";
        return;
    }
    const meter = getMeter(num,u1);
    const res = fromMeter(meter,u2);
    resBox.innerText = res.toFixed(4);
}

// ========== 自定义倒计时（用户自行设置时分秒） ==========
let cdTimer = null;
let cdTotal = 0;
const cdShow = document.getElementById("cdShow");
const cdH = document.getElementById("cdH");
const cdM = document.getElementById("cdM");
const cdS = document.getElementById("cdS");

// 输入框自动同步显示时间
function syncCdView() {
    let h = Number(cdH.value) || 0;
    let m = Number(cdM.value) || 0;
    let s = Number(cdS.value) || 0;
    cdTotal = h * 3600 + m * 60 + s;
    cdShow.innerText = 转时分秒(cdTotal);
}
cdH.oninput = syncCdView;
cdM.oninput = syncCdView;
cdS.oninput = syncCdView;

// 开始倒计时
document.getElementById("cdStart").onclick = function(){
    clearInterval(cdTimer);
    syncCdView();
    if(cdTotal <= 0) return;
    cdTimer = setInterval(()=>{
        cdTotal--;
        cdShow.innerText = 转时分秒(cdTotal);
        if(cdTotal <= 0){
            clearInterval(cdTimer);
            alert(isCN ? "倒计时结束！" : "Countdown Finished!");
        }
    },1000)
}
// 暂停
document.getElementById("cdPause").onclick = ()=> clearInterval(cdTimer);
// 重置
document.getElementById("cdReset").onclick = ()=>{
    clearInterval(cdTimer);
    cdH.value = 0;
    cdM.value = 0;
    cdS.value = 10;
    syncCdView();
}
syncCdView();
