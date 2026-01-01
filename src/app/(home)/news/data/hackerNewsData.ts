import type { MonthlyData, DeepDiveData } from '../types'; // 导入类型定义

// 月度数据：2025 年每个月的 Top 5 热门话题
export const monthlyData: MonthlyData = {
  // 1 月数据
  1: [
    { id: 101, title: "GPT-5 发布：多模态推理能力大幅提升", points: 3420, category: "AI", isTop20: true },
    { id: 102, title: "Linux 6.13 将正式移除对旧版 x86 的支持", points: 1200, category: "Dev", isTop20: false },
    { id: 103, title: "DeepSeek 开源 200B MoE 模型", points: 2800, category: "AI", isTop20: true },
    { id: 104, title: "我的 SaaS 如何在 2024 年实现 100 万美元 ARR", points: 980, category: "Business", isTop20: false },
    { id: 105, title: "Show HN: 这是一个用 Rust 编写的浏览器引擎", points: 1500, category: "Dev", isTop20: false }
  ],
  // 2 月数据
  2: [
    { id: 201, title: "Apple Vision Air 传闻：更轻，更便宜，无手柄", points: 2100, category: "Tech", isTop20: true },
    { id: 202, title: "为什么 Python 4.0 可能会破坏一切", points: 1850, category: "Dev", isTop20: true },
    { id: 203, title: "美国法院裁定 AI 生成代码不受版权保护", points: 3100, category: "Society", isTop20: true },
    { id: 204, title: "NASA 确认木卫二地下海洋存在碳基分子", points: 2400, category: "Tech", isTop20: false },
    { id: 205, title: "HTMX 2.0 发布", points: 1300, category: "Dev", isTop20: false }
  ],
  // 3 月数据
  3: [
    { id: 301, title: "Sam Altman 关于 AGI 时间表的新博文", points: 4200, category: "AI", isTop20: true },
    { id: 302, title: "GitHub Copilot 现在可以自动修复 80% 的 Bug", points: 2900, category: "Dev", isTop20: false },
    { id: 303, title: "欧盟通过《AI 责任法案》", points: 1600, category: "Society", isTop20: true },
    { id: 304, title: "我们终于合成了室温超导材料吗？(再次讨论)", points: 3500, category: "Tech", isTop20: false },
    { id: 305, title: "PostgreSQL 18 的新特性：向量搜索原生集成", points: 1400, category: "Dev", isTop20: false }
  ],
  // 4 月数据
  4: [
    { id: 401, title: "SpaceX Starship 成功在火星表面软着陆（无人）", points: 5100, category: "Tech", isTop20: true },
    { id: 402, title: "Google 宣布关闭 GCP 的免费层级", points: 3800, category: "Business", isTop20: true },
    { id: 403, title: "Node.js 的创始人：为什么我回到了 Go", points: 1700, category: "Dev", isTop20: false },
    { id: 404, title: "Show HN: 能够运行在树莓派上的 7B 模型", points: 2200, category: "AI", isTop20: false },
    { id: 405, title: "从远程工作回归办公室的浪潮正在消退", points: 1100, category: "Society", isTop20: false }
  ],
  // 5 月数据
  5: [
    { id: 501, title: "NVIDIA 发布 Blackwell Ultra 芯片，算力再翻倍", points: 2600, category: "Tech", isTop20: false },
    { id: 502, title: "React 20 发布：全自动 Memoization", points: 3300, category: "Dev", isTop20: true },
    { id: 503, title: "OpenAI 的 'Agent' 商店上线", points: 2950, category: "AI", isTop20: true },
    { id: 504, title: "不要使用 Docker，使用 Wasm", points: 1200, category: "Dev", isTop20: false },
    { id: 505, title: "FBI 关闭主要勒索软件团伙服务器", points: 1900, category: "Society", isTop20: false }
  ],
  // 6 月数据
  6: [
    { id: 601, title: "WWDC 2025: Siri 终于变成了真正的 AI 助理", points: 2800, category: "Tech", isTop20: true },
    { id: 602, title: "Mozilla Firefox 市场份额回升至 10%", points: 4100, category: "Society", isTop20: true },
    { id: 603, title: "CSS Grid Level 3 规范草案", points: 900, category: "Dev", isTop20: false },
    { id: 604, title: "Waymo 获准在全美 50 个州运营无人驾驶出租车", points: 2300, category: "Tech", isTop20: false },
    { id: 605, title: "告别 Microservices，回归 Monolith", points: 1650, category: "Dev", isTop20: false }
  ],
  // 7 月数据
  7: [
    { id: 701, title: "全球首个核聚变发电厂破土动工（ITER 演示堆）", points: 4500, category: "Tech", isTop20: true },
    { id: 702, title: "Meta 开源 LLaMA-4：600B 参数，性能超越 GPT-5", points: 3700, category: "AI", isTop20: true },
    { id: 703, title: "Twitter (X) 宣布破产重组", points: 5200, category: "Business", isTop20: true },
    { id: 704, title: "TypeScript 6.0 Beta：原生运行时类型检查", points: 1500, category: "Dev", isTop20: false },
    { id: 705, title: "为什么年轻的开发者不再使用 Git 命令行", points: 800, category: "Dev", isTop20: false }
  ],
  // 8 月数据
  8: [
    { id: 801, title: "Neuralink 成功让瘫痪患者通过意念控制外骨骼行走", points: 3900, category: "Tech", isTop20: true },
    { id: 802, title: "亚马逊宣布 100% 机器人配送中心", points: 2100, category: "Business", isTop20: false },
    { id: 803, title: "Carbon 语言正式发布 1.0", points: 2600, category: "Dev", isTop20: true },
    { id: 804, title: "黑客利用量子计算机攻破旧版 RSA 加密（实验环境）", points: 3300, category: "Tech", isTop20: false },
    { id: 805, title: "Show HN: 开源的 Notion 替代品，本地优先", points: 1800, category: "Dev", isTop20: false }
  ],
  // 9 月数据
  9: [
    { id: 901, title: "iPhone 17：没有充电口，完全无线", points: 2500, category: "Tech", isTop20: false },
    { id: 902, title: "Claude 4 发布：拥有自我纠错能力", points: 3100, category: "AI", isTop20: true },
    { id: 903, title: "互联网档案室（Internet Archive）赢得版权诉讼", points: 4800, category: "Society", isTop20: false },
    { id: 904, title: "Bun v2.0 发布：比 Node.js 快 10 倍", points: 1900, category: "Dev", isTop20: false },
    { id: 905, title: "一位工程师的辞职信：被 AI 取代的故事", points: 2700, category: "Society", isTop20: false }
  ],
  // 10 月数据
  10: [
    { id: 1001, title: "SpaceX 宣布 2029 年首批人类火星移民名单", points: 4300, category: "Tech", isTop20: false },
    { id: 1002, title: "Windows 13 泄露：基于 Linux 内核？", points: 3600, category: "Tech", isTop20: false },
    { id: 1003, title: "WebAssembly 组件模型 (WASI 0.3) 标准化完成", points: 1400, category: "Dev", isTop20: false },
    { id: 1004, title: "AI 可以在 30 秒内生成一部 10 分钟的短片", points: 3200, category: "AI", isTop20: true },
    { id: 1005, title: "Signal 宣布抗量子加密协议全面上线", points: 2100, category: "Tech", isTop20: false }
  ],
  // 11 月数据
  11: [
    { id: 1101, title: ".NET 10 发布：彻底拥抱 AOT 编译", points: 1600, category: "Dev", isTop20: false },
    { id: 1102, title: "OpenAI CEO 再次被罢免（谣言与真相）", points: 5500, category: "Business", isTop20: false },
    { id: 1103, title: "Show HN: 2025 招聘市场数据分析", points: 2400, category: "Society", isTop20: false },
    { id: 1104, title: "全球达成《数字日内瓦公约》禁止攻击民用基础设施", points: 2900, category: "Society", isTop20: true },
    { id: 1105, title: "Rust 成为 Linux 内核第二大主要语言", points: 3800, category: "Dev", isTop20: false }
  ],
  // 12 月数据
  12: [
    { id: 1201, title: "2025 Advent of Code 第一天", points: 1200, category: "Dev", isTop20: false },
    { id: 1202, title: "年度回顾：即使有 AI，我们依然在写 JavaScript", points: 4100, category: "Dev", isTop20: false },
    { id: 1203, title: "Google DeepMind 解决千禧年数学难题之一", points: 5300, category: "Tech", isTop20: false },
    { id: 1204, title: "Metaverse 彻底死亡？VR 销量年降 40%", points: 2000, category: "Business", isTop20: false },
    { id: 1205, title: "GPT-5.5 Turbo 作为一个惊喜圣诞礼物发布", points: 3900, category: "AI", isTop20: false }
  ]
};

// 深度洞察数据：Top 20 事件的详细分析
export const deepDiveData: DeepDiveData = {
  // GPT-5 发布
  101: {
    content: "OpenAI 在 1 月发布的 GPT-5 标志着大模型从'聊天机器人'向'推理引擎'的决定性转变。它展示了真正的多模态理解能力，能像人类一样处理视频流并实时做出反应。Hacker News 社区对其上下文窗口的无限扩展性进行了激烈的讨论。",
    impact: "彻底改变了 B2B 软件的交互模式。SaaS 产品开始大规模转向'自然语言优先'的 UI，传统的仪表盘和表单开始显得过时。"
  },
  // DeepSeek 开源模型
  103: {
    content: "DeepSeek 发布的 200B MoE（混合专家）模型打破了闭源模型的垄断。其性能在编码和数学任务上逼近 GPT-4.5，但可以在消费级工作站上通过量化运行。这是开源 AI 社区的一次巨大胜利。",
    impact: "加速了'本地 AI'的发展趋势。企业开始部署私有化大模型以保护数据隐私，不再盲目依赖 API 调用，推动了边缘计算硬件的销量。"
  },
  // Apple Vision Air
  201: {
    content: "Vision Air 的传闻（并在后来得到证实）显示 Apple 放弃了高昂的 Vision Pro 定价策略，转向轻量化眼镜形态。通过将计算卸载到 iPhone，设备重量降至 100g 以下。",
    impact: "AR 终于开始走出极客圈层。虽然没有取代手机，但开始成为这一代开发者的'第二块屏幕'，推动了空间计算 Web 标准的制定。"
  },
  // Python 4.0
  202: {
    content: "Python 4.0 的提案建议移除 GIL（全局解释器锁）并引入不向后兼容的性能优化。社区分裂为两派：追求性能的拥护者和担心生态破碎的保守派。",
    impact: "虽然 Python 4.0 尚未正式发布，但这场讨论促使许多库（如 NumPy, Pandas）加速了底层的 Rust 重写，间接提升了整个生态的效率。"
  },
  // AI 生成代码版权
  203: {
    content: "美国法院的这一裁定确认了 AI 生成的代码属于公共领域，除非有人类进行了'重大修改'。这引发了开源许可证的巨大危机：如果你的开源项目被 AI 学习并重写，GPL 还有效吗？",
    impact: "导致了'源码可用（Source Available）'许可证的复兴。商业公司开始使用更严格的协议保护其核心逻辑，开源定义面临 20 年来最大的挑战。"
  },
  // Sam Altman AGI 博文
  301: {
    content: "Sam Altman 的博文不再含糊其辞，明确提出了 AGI 的基准测试：自我研发新科学知识的能力。社区对其'AI 将在 2027 年前解决物理难题'的预测反应两极分化。",
    impact: "引发了风险投资对 'AI for Science'（生物科技、材料学）领域的疯狂涌入，纯文本生成的 AI 创业公司估值开始回调。"
  },
  // 欧盟 AI 责任法案
  303: {
    content: "欧盟的法案要求所有高风险 AI 模型必须具有可解释性，并为错误决策承担法律责任。这迫使科技巨头不得不放慢发布速度，重新设计模型的安全护栏。",
    impact: "形成了'布鲁塞尔效应'，全球 AI 开发分裂为'合规版'和'自由版'。同时也催生了'AI 审计'这一全新的千亿级咨询市场。"
  },
  // SpaceX 火星软着陆
  401: {
    content: "SpaceX 星舰（Starship）在火星的无人软着陆是航天史的里程碑。虽然没有人类在场，但传回的 8K 视频让全球屏息。HN 社区充满了对技术细节（隔热瓦、燃料生成）的硬核分析。",
    impact: "太空科技重新成为顶级黑客的向往之地。并在材料科学和能源存储领域激发了新的初创公司浪潮，目标是为 2029 年的载人任务服务。"
  },
  // Google 关闭 GCP 免费层级
  402: {
    content: "Google 取消 GCP 免费层级被视为云服务'圈地时代'结束的信号。开发者们愤怒地迁移到 Cloudflare 和 VPS 提供商，引发了对'去云化'（De-clouding）的热烈讨论。",
    impact: "推动了 Self-Hosting（自托管）运动的复兴。像 Coolify 这样的 PaaS 替代品变得极度流行，开发者开始重新学习 Linux 运维技能。"
  },
  // React 20
  502: {
    content: "React 20 通过全新的编译器（React Compiler）实现了自动化的细粒度更新，开发者不再需要手动写 useMemo 和 useCallback。这是一个为了对抗 Svelte 和 SolidJS 的反击。",
    impact: "降低了前端开发的门槛，但也让'React 工程师'这一职位的含金量受到质疑。框架之争进入'编译器之争'的新阶段。"
  },
  // OpenAI Agent 商店
  503: {
    content: "OpenAI 的 Agent Store 允许开发者上传具有特定技能和工具访问权限的 AI 代理。这被比作 2008 年的 App Store 时刻，成千上万的开发者涌入。",
    impact: "重塑了服务业。旅行社、法律咨询、初级会计等服务被封装成 API 调用的 Agent，传统的'中间商'商业模式遭到毁灭性打击。"
  },
  // Siri AI 升级
  601: {
    content: "Siri 的升级展示了端侧大模型（On-device LLM）的潜力。它能理解屏幕内容并跨应用执行操作，不再是那个只会定闹钟的语音助手。",
    impact: "隐私成为新的奢侈品。用户开始意识到，只有在本地运行的 AI 才是真正属于自己的 AI，推动了高算力手机和笔记本的换机潮。"
  },
  // Firefox 市场份额回升
  602: {
    content: "随着 Chrome 的广告拦截限制（Manifest V3）全面实施，技术用户大规模回流 Firefox。Mozilla 借机推出了基于 AI 的隐私保护套件。",
    impact: "证明了浏览器引擎的多样性对 Web 健康至关重要。这也迫使 Google 在后续版本中软化了对拦截插件的限制。"
  },
  // 核聚变发电厂
  701: {
    content: "ITER（国际热核聚变实验堆）虽然只是演示堆，但其破土动工和点火实验的成功让'永远还有 50 年'的笑话变成了'可能只有 15 年'。HN 上充斥着物理学家的硬核科普。",
    impact: "能源初创公司获得了前所未有的关注。虽然距离商用还很远，但它改变了全球对碳中和时间表的预期，核能不再是禁忌话题。"
  },
  // LLaMA-4 开源
  702: {
    content: "Meta 坚持开源策略，LLaMA-4 的发布再次拉低了构建顶级 AI 应用的门槛。其推理能力在多数基准测试中超越了当时闭源的 GPT-5 早期版本。",
    impact: "巩固了 Meta 在 AI 开发者社区的领导地位。'开源 vs 闭源'的战争中，开源派因为 LLaMA-4 获得了一张王牌，使得专有模型难以建立护城河。"
  },
  // Twitter 破产重组
  703: {
    content: "Twitter (X) 的破产重组标志着旧时代社交媒体巨头的终结。过度的商业化和算法操纵导致核心用户流失到去中心化协议（如 Bluesky 和 Nostr）。",
    impact: "加速了联邦宇宙（Fediverse）的主流化。开发者开始构建基于协议而非平台的社交应用，'数据所有权'成为 2025 年 Web 开发的核心原则。"
  },
  // Neuralink 脑机接口
  801: {
    content: "Neuralink 的演示视频展示了一位脊髓损伤患者通过脑机接口流畅地控制外骨骼行走。这不仅仅是医疗突破，更是人机融合的奇点时刻。",
    impact: "引发了关于'赛博格（Cyborg）'权利的伦理大讨论。同时也开启了脑机接口在游戏和高强度脑力工作中的潜在商用场景。"
  },
  // Carbon 语言 1.0
  803: {
    content: "Google 推出的 Carbon 语言旨在接替 C++。1.0 版本的发布意味着它已准备好用于生产环境。它拥有 C++ 的性能但具备现代的安全特性。",
    impact: "加剧了系统编程语言的竞争（Rust vs Carbon）。虽然 Rust 依然占据先发优势，但 Carbon 为庞大的 C++ 遗留代码库提供了一条更平滑的现代化路径。"
  },
  // Claude 4 自我纠错
  902: {
    content: "Anthropic 的 Claude 4 引入了'宪法 AI'的自我纠错机制，在生成代码和长文时，它能自我反思并修正逻辑错误，幻觉率降低了 90%。",
    impact: "让 AI 真正进入了关键任务领域（如法律起草、医疗诊断辅助）。企业对 AI 的信任度大幅提升，不再仅仅将其视为生成玩具。"
  },
  // AI 短片生成
  1004: {
    content: "AI 可以在 30 秒内生成一部 10 分钟的短片",
    impact: "彻底改变了内容创作行业，传统视频制作流程面临重大变革。"
  },
  // 数字日内瓦公约
  1104: {
    content: "面对日益频繁的网络战，各国终于达成协议，禁止对电网、医院和金融系统进行国家级网络攻击。这是一个脆弱但必要的休战。",
    impact: "网络安全行业重点从'防御攻击'转向'合规与溯源'。基础设施软件的安全性标准被强制提高，DevSecOps 成为所有开发团队的标配。"
  }
};

