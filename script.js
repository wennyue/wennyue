// ============================================================================
// 项目：今日饮食运势决策币
// 功能：帮助用户随机决定今日晚餐，通过运势抽签和抛硬币的有趣方式
// 版本：1.0
// ============================================================================

// --------------------------- 数据结构定义 ----------------------------------
// 完整的运势和美食池数据结构，包含五大运势及其对应的美食推荐和文案
const fortuneData = {
    reward: {
        name: '犒劳自己',
        description: '功勋章上有你的一半，也有胃的一半！批准你放肆一下！',
        foodPool: ['火锅', '烧烤', '烤鱼', '自助餐', '日料', '牛排', '大餐外卖'],
        color: '#ff6b6b',
        comments: {
            '火锅': '判决：火锅！红油翻滚，烦恼滚开。此物最能慰藉辛劳之魂，准奏！',
            '烧烤': '判决：烧烤！孜然飘香，肉欲横流。今日的努力，就用滋滋冒油的肉串来犒赏！',
            '烤鱼': '判决：烤鱼！外焦里嫩，麻辣鲜香。人生得意须尽欢，莫负美食好时光。',
            '自助餐': '判决：自助餐！海纳百川，任你挑选。今天的胃，由你做主！',
            '日料': '判决：日料！精致细腻，禅意十足。偶尔也该让味蕾享受一下高级待遇。',
            '牛排': '判决：牛排！鲜嫩多汁，仪式感满满。刀叉之间，都是对自己的尊重。',
            '大餐外卖': '判决：大餐外卖！不必出门，美味上门。懒得出门，也不能亏待自己。'
        }
    },
    health: {
        name: '养生局',
        description: '身体发出的信号，你收到了吗？是时候清理一下肠胃啦。',
        foodPool: ['沙拉', '轻食', '自己做饭', '小碗菜', '养生粥', '蒸菜', '汤品'],
        color: '#4ecdc4',
        comments: {
            '沙拉': '批复：沙拉！新鲜脆嫩，营养均衡。偶尔让肠胃轻松一下，也是一种养生。',
            '轻食': '批复：轻食！低脂低盐，健康美味。吃得清淡，活得轻松。',
            '自己做饭': '批复：自己做饭！唯有自己掌勺，方知油盐深浅。干净饮食，是最好的保健品。',
            '小碗菜': '批复：小碗菜！种类丰富，份量适中。少食多餐，健康生活的开始。',
            '养生粥': '批复：养生粥！温润滋养，调理肠胃。一碗热粥，胜过无数良药。',
            '蒸菜': '批复：蒸菜！保留营养，清淡可口。少油少盐，健康相伴。',
            '汤品': '批复：汤品！营养丰富，易于吸收。饭前一碗汤，健康又营养。'
        }
    },
    happiness: {
        name: '小确幸',
        description: '生活普普通，也要乐在其中～去找寻那份专属你的小美好吧。',
        foodPool: ['日式拉面', '精致的简餐', '氛围感小酒馆', '特色菜馆', '颜值很高的咖喱饭', 'brunch', '广式茶点'],
        color: '#ffe66d',
        comments: {
            '日式拉面': '指引：日式拉面。热汤、溏心蛋、叉烧，这碗\'一个人的盛宴\'，就是最好的治愈。',
            '精致的简餐': '指引：精致的简餐。小巧精致，赏心悦目。生活需要仪式感，哪怕只是一顿简餐。',
            '氛围感小酒馆': '指引：氛围感小酒馆。灯光昏黄，音乐轻柔。在这里，连吃饭都变成了一种享受。',
            '特色菜馆': '指引：特色菜馆。地道风味，独特体验。每一口都是惊喜，每一道都是故事。',
            '颜值很高的咖喱饭': '指引：颜值很高的咖喱饭。香气扑鼻，色彩诱人。好看又好吃，就是小确幸的真谛。',
            'brunch': '指引：brunch。慵懒的早晨，美味的食物。慢下来，享受生活的美好。',
            '广式茶点': '指引：广式茶点。精致小巧，品种多样。慢品慢食，感受生活的悠闲。'
        }
    },
    lazy: {
        name: '躺平',
        description: '检测到你的能量已耗尽。启动\'能不动就不动\'模式！',
        foodPool: ['泡面', '速冻水饺', '蛋炒饭', '螺蛳粉', '麦当劳/肯德基', '楼下面馆', '剩饭'],
        color: '#1a535c',
        comments: {
            '泡面': '裁定：泡面！人类的伟大发明，懒癌的终极福音。建议加个蛋，以示对生活的尊重。',
            '速冻水饺': '裁定：速冻水饺！方便快捷，热水一煮就能吃。有时候，简单就是幸福。',
            '蛋炒饭': '裁定：蛋炒饭！剩饭的华丽转身，简单又美味。一碗炒饭，解决所有烦恼。',
            '螺蛳粉': '裁定：螺蛳粉！闻着臭吃着香，懒人必备美食。臭味相投，快乐翻倍。',
            '麦当劳/肯德基': '裁定：麦当劳/肯德基！不用做饭不用洗碗，快餐界的扛把子。今天，就放纵一下吧。',
            '楼下面馆': '裁定：楼下面馆！下楼就能吃到，省时省力。有时候，熟悉的味道最治愈。',
            '剩饭': '裁定：剩饭！勤俭节约是美德，热一热就能吃。今天，就当是忆苦思甜吧。'
        }
    },
    destiny: {
        name: '天注定',
        description: '缘，妙不可言。食，亦是如此。请将一切交给命运。',
        // 天注定运势会使用所有食物池的总和
        color: '#ff9f1c',
        comments: null // 特殊处理，会动态生成
    }
};

// 生成天注定的混合食物池
const allFoods = [];
Object.keys(fortuneData).forEach(key => {
    if (key !== 'destiny' && fortuneData[key].foodPool) {
        fortuneData[key].foodPool.forEach(food => {
            allFoods.push({ food: food, from: key });
        });
    }
});
fortuneData.destiny.mixedFoodPool = allFoods;

// 获取所有池子的食物总和
function getAllFoods() {
    let allFoods = [];
    Object.keys(fortuneData).forEach(key => {
        if (key !== 'destiny' && fortuneData[key].foodPool) {
            allFoods = allFoods.concat(fortuneData[key].foodPool);
        }
    });
    return allFoods;
}

// --------------------------- DOM元素定义 -----------------------------------
// 获取所有需要操作的DOM元素
const startupAnimation = document.getElementById('startup-animation');
const lotterySection = document.getElementById('lottery-section');
const fortuneSection = document.getElementById('fortune-section');
const coinSection = document.getElementById('coin-section');
const resultSection = document.getElementById('result-section');
const drawButton = document.getElementById('draw-button');
const coinButton = document.getElementById('coin-button');
const restartButton = document.getElementById('restart-button');
const lotteryWheel = document.getElementById('lottery-wheel');
const coin = document.getElementById('coin');
const fortuneTitle = document.getElementById('fortune-title');
const fortuneText = document.getElementById('fortune-text');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const foodAnimation = document.getElementById('food-animation');
const staticNoise = document.querySelector('.static-noise');
const wheelSections = document.querySelectorAll('.wheel-section');

// --------------------------- 全局变量 ---------------------------------------
// 当前选择的运势
let currentFortune = null;

// --------------------------- 初始化函数 -------------------------------------
// 页面初始化，设置事件监听和开机动画
function init() {
    // 显示静态噪声
    setTimeout(() => {
        staticNoise.style.opacity = 0.8;
    }, 500);
    
    // 开机动画后进入抽签界面
    setTimeout(() => {
        startupAnimation.classList.add('hidden');
        lotterySection.classList.remove('hidden');
    }, 3000);
    
    // 抽签按钮点击事件
    drawButton.addEventListener('click', drawFortune);
    
    // 硬币按钮点击事件
    coinButton.addEventListener('click', flipCoin);
    
    // 重新开始按钮点击事件
    restartButton.addEventListener('click', restart);
}

// --------------------------- 抽签功能 ---------------------------------------
// 执行运势抽签动画，随机选择一种运势
function drawFortune() {
    drawButton.disabled = true;
    
    // 添加旋转闪光效果
    lotteryWheel.classList.add('spinning');
    
    // 随机选择运势
    const fortunes = Object.keys(fortuneData);
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    currentFortune = randomFortune;
    
    // 计算旋转角度（72度一个分区）
    const sectionIndex = fortunes.indexOf(randomFortune);
    const rotationAngle = 360 * 4 + (72 * sectionIndex) + 36; 
    
    // 应用旋转动画
    lotteryWheel.style.transform = `rotate(${rotationAngle}deg)`;
    
    // 模拟转盘减速效果
    let startTime;
    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / 4000;
        
        // 添加电视屏幕闪烁效果
        if (progress > 0.3 && progress < 0.7) {
            const tvScreen = document.querySelector('.tv-screen');
            const randomFlicker = Math.random();
            if (randomFlicker < 0.05) {
                tvScreen.style.opacity = 0.95;
                setTimeout(() => {
                    tvScreen.style.opacity = 1;
                }, 50);
            }
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };
    
    requestAnimationFrame(animate);
    
    // 旋转结束前短暂停顿，然后移除闪光效果
    setTimeout(() => {
        lotteryWheel.classList.remove('spinning');
    }, 3500);
    
    // 旋转结束后显示运势
    setTimeout(() => {
        // 为选中的分区添加高亮效果
        wheelSections.forEach((section, index) => {
            if (index === sectionIndex) {
                section.classList.add('active');
            }
        });
        
        // 延迟切换到运势展示
        setTimeout(() => {
            lotterySection.classList.add('hidden');
            fortuneSection.classList.remove('hidden');
            
            // 添加文字出现动画
            fortuneTitle.style.opacity = 0;
            fortuneText.style.opacity = 0;
            fortuneTitle.style.transform = 'translateY(20px)';
            fortuneText.style.transform = 'translateY(20px)';
            
            // 设置运势内容
            fortuneTitle.textContent = fortuneData[currentFortune].name;
            fortuneText.textContent = fortuneData[currentFortune].description;
            
            // 根据运势改变标题颜色
            fortuneTitle.style.color = fortuneData[currentFortune].color;
            
            // 添加运势标题的光晕效果
            fortuneTitle.style.textShadow = `0 0 8px ${fortuneData[currentFortune].color}80, 0 0 12px ${fortuneData[currentFortune].color}40`;
            
            // 文字出现动画
            setTimeout(() => {
                fortuneTitle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                fortuneText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                fortuneTitle.style.opacity = 1;
                fortuneTitle.style.transform = 'translateY(0)';
                
                // 文字延迟出现
                setTimeout(() => {
                    fortuneText.style.opacity = 1;
                    fortuneText.style.transform = 'translateY(0)';
                }, 300);
            }, 100);
        }, 1000);
    }, 4000);
}

// --------------------------- 重新开始功能 -----------------------------------
// 重置所有状态，准备新一轮抽签
function restart() {
    // 重置状态
    currentFortune = null;
    coin.classList.remove('coin-flipping');
    lotteryWheel.style.transform = 'rotate(0deg)';
    lotteryWheel.style.transition = 'transform 4s cubic-bezier(0.1, 0.8, 0.2, 1)';
    
    // 移除高亮效果
    wheelSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // 隐藏结果，显示抽签界面
    resultSection.classList.add('hidden');
    lotterySection.classList.remove('hidden');
    
    // 启用按钮
    drawButton.disabled = false;
    coinButton.disabled = false;
}

// --------------------------- 抛硬币功能 ---------------------------------------
// 执行抛硬币动画，随机决定最终结果
function flipCoin() {
    if (!currentFortune) return;
    coinButton.disabled = true;
    
    // 显示硬币界面
    fortuneSection.classList.add('hidden');
    coinSection.classList.remove('hidden');
    
    // 重置硬币状态
    coin.style.transform = 'rotateY(0deg)';
    coin.style.opacity = 1;
    
    // 添加硬币翻转动画
    coin.classList.add('coin-flipping');
    
    // 增强的3D翻转效果
    let flipCount = 0;
    const totalFlips = 15;
    
    // 辅助函数处理动态翻转
    function flipCoinAnimation(currentFlip, maxFlips) {
        // 更复杂的物理模拟，增加硬币的随机性
        const rotationY = currentFlip * 180;
        const randomZRotation = (Math.random() - 0.5) * 5;
        const scaleVariation = 0.95 + (Math.random() * 0.1);
        
        coin.style.transform = `rotateY(${rotationY}deg) rotateZ(${randomZRotation}deg) scale(${scaleVariation})`;
        
        // 添加光影变化效果
        const shadowOpacity = 0.3 + (Math.random() * 0.2);
        const shadowBlur = 10 + (Math.random() * 5);
        coin.style.boxShadow = `0 8px ${shadowBlur}px rgba(0, 0, 0, ${shadowOpacity})`;
        
        // 模拟电视屏幕闪烁效果
        if (currentFlip % 3 === 0) {
            const tvScreen = document.querySelector('.tv-screen');
            tvScreen.style.opacity = 0.97;
            setTimeout(() => {
                tvScreen.style.opacity = 1;
            }, 30);
        }
        
        // 继续翻转或结束
        if (currentFlip < maxFlips) {
            // 随着翻转减少，减慢速度
            const speedFactor = 1 - (currentFlip / maxFlips) * 0.7;
            setTimeout(() => {
                flipCoinAnimation(currentFlip + 1, maxFlips);
            }, 100 * speedFactor);
        } else {
            // 翻转完成
            setTimeout(() => {
                coin.classList.remove('coin-flipping');
                coinSection.classList.add('hidden');
                showResult();
            }, 500);
        }
    }
    
    // 延迟一点时间再开始抛硬币动画
    setTimeout(() => {
        // 开始第一个翻转
        flipCoinAnimation(1, totalFlips);
    }, 500);
}

// --------------------------- 结果展示功能 -----------------------------------
// 根据抽到的运势，从对应的美食池中随机选择食物并展示
function showResult() {
    resultSection.classList.remove('hidden');
    
    // 随机选择食物
    let selectedFood, foodComment;
    
    if (currentFortune === 'destiny') {
        // 天注定：从混合池中随机选择
        const randomIndex = Math.floor(Math.random() * fortuneData.destiny.mixedFoodPool.length);
        const selected = fortuneData.destiny.mixedFoodPool[randomIndex];
        selectedFood = selected.food;
        foodComment = `天意如此：${selectedFood}！此乃上天安排的最大，请好好享受这份机缘。`;
    } else {
        // 其他运势：从对应食物池随机选择
        const foodPool = fortuneData[currentFortune].foodPool;
        const randomIndex = Math.floor(Math.random() * foodPool.length);
        selectedFood = foodPool[randomIndex];
        foodComment = fortuneData[currentFortune].comments[selectedFood];
    }
    
    // 模拟电视屏幕闪烁效果
    const tvScreen = document.querySelector('.tv-screen');
    let flickerCount = 0;
    const flickerInterval = setInterval(() => {
        if (flickerCount < 3) {
            tvScreen.style.opacity = 0.9;
            setTimeout(() => {
                tvScreen.style.opacity = 1;
            }, 30);
            flickerCount++;
        } else {
            clearInterval(flickerInterval);
            
            // 闪烁结束后显示结果
            setTimeout(() => {
                // 添加食物出现动画
                resultTitle.style.opacity = 0;
                resultTitle.style.transform = 'translateY(20px)';
                resultTitle.style.fontSize = '48px';
                resultTitle.style.fontWeight = 'bold';
                
                // 根据运势设置食物颜色
                resultTitle.style.color = fortuneData[currentFortune].color;
                
                // 设置食物内容
                resultTitle.textContent = selectedFood;
                
                // 食物出现动画
                setTimeout(() => {
                    resultTitle.style.transition = 'opacity 0.6s ease, transform 0.6s ease, fontSize 0.4s ease 0.3s';
                    resultTitle.style.opacity = 1;
                    resultTitle.style.transform = 'translateY(0)';
                    
                    // 缩小字体
                    setTimeout(() => {
                        resultTitle.style.fontSize = '32px';
                        
                        // 显示评论
                        setTimeout(() => {
                            resultText.style.opacity = 0;
                            resultText.style.transform = 'translateY(20px)';
                            // 确保评论文本正确显示，不重复
                            resultText.textContent = foodComment;
                            
                            setTimeout(() => {
                                resultText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                                resultText.style.opacity = 1;
                                resultText.style.transform = 'translateY(0)';
                            }, 100);
                        }, 300);
                    }, 300);
                }, 100);
                
                // 添加一些随机图标效果
                const foodIcons = ['🍲', '🍖', '🍣', '🍜', '🍕', '🌮', '🍱'];
                const randomIcon = foodIcons[Math.floor(Math.random() * foodIcons.length)];
                
                // 如果foodAnimation元素存在，添加图标
                if (foodAnimation) {
                    foodAnimation.textContent = randomIcon;
                    foodAnimation.style.opacity = 0;
                    foodAnimation.style.transform = 'scale(0)';
                    
                    setTimeout(() => {
                        foodAnimation.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        foodAnimation.style.opacity = 1;
                        foodAnimation.style.transform = 'scale(1.2)';
                        
                        setTimeout(() => {
                            foodAnimation.style.transform = 'scale(1)';
                        }, 200);
                    }, 500);
                }
                
                // 启用重新开始按钮
                setTimeout(() => {
                    restartButton.disabled = false;
                    
                    // 添加重新开始按钮的呼吸动画
                    restartButton.style.animation = 'breathing 2s infinite ease-in-out';
                }, 1500);
            }, 200);
        }
    }, 100);
    
    // 创建食物动画
    setTimeout(() => {
        createFoodAnimation(selectedFood);
    }, 1000);
}

// --------------------------- 食物动画效果 -----------------------------------
// 为选中的食物添加视觉效果
function createFoodAnimation(foodName) {
    foodAnimation.innerHTML = '';
    
    // 使用食物相关图标替代文字
    const foodIcons = {
        '火锅': '🍲',
        '烧烤': '🍖',
        '烤鱼': '🐟',
        '自助餐': '🍽️',
        '日料': '🍣',
        '牛排': '🥩',
        '大餐外卖': '📦',
        '沙拉': '🥗',
        '轻食': '🥪',
        '自己做饭': '👨‍🍳',
        '小碗菜': '🥘',
        '养生粥': '🥣',
        '蒸菜': '🍲',
        '汤品': '🍜',
        '日式拉面': '🍜',
        '精致的简餐': '🥗',
        '氛围感小酒馆': '🍻',
        '特色菜馆': '🍽️',
        '颜值很高的咖喱饭': '🍛',
        'brunch': '🥞',
        '广式茶点': '🥟',
        '泡面': '🍜',
        '速冻水饺': '🥟',
        '蛋炒饭': '🍚',
        '螺蛳粉': '🍜',
        '麦当劳/肯德基': '🍔',
        '楼下面馆': '🍜',
        '剩饭': '🍱'
    };
    
    const foodElement = document.createElement('div');
    foodElement.textContent = foodIcons[foodName] || '🍽️';
    foodElement.style.fontSize = '3rem';
    foodElement.style.animation = 'foodFloat 3s infinite ease-in-out';
    
    foodAnimation.appendChild(foodElement);
    
    // 添加食物动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes foodFloat {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-15px) scale(1.1); opacity: 0.9; }
        }
    `;
    document.head.appendChild(style);
}

// 页面加载完成后初始化
window.addEventListener('load', init);