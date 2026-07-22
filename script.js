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

const 输入框 = document.getElementById("计算输入框");
document.querySelectorAll(".计算按键区 button").forEach(按键 => {
    按键.onclick = () => {
        const 文字 = 按键.innerText;
        if (文字 === "清空") {
            输入框.value = "";
        } else if (文字 === "=") {
            try {
                输入框.value = eval(输入框.value);
            } catch {
                输入框.value = "错误";
            }
        } else {
            输入框.value += 文字;
        }
    }
})

const 最小输入 = document.getElementById("最小值");
const 最大输入 = document.getElementById("最大值");
const 随机数字框 = document.getElementById("随机数字");
document.getElementById("生成按钮").onclick = () => {
    let min = Number(最小输入.value);
    let max = Number(最大输入.value);
    if(min >= max) {
        随机数字框.innerText = "数值错误";
        return;
    }
    const 结果 = Math.floor(Math.random() * (max - min + 1)) + min;
    随机数字框.innerText = 结果;
}
