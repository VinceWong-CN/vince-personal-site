'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SwingingBadge from './SwingingBadge';

type CaseStudy = {
  id: string;
  title: string;
  category: string;
  role: string;
  challenge: string;
  judgement: string;
  actions: string[];
  results: string[];
  metrics: { value: string; label: string }[];
  media?: string;
  mediaAlt?: string;
  visual?: 'regional' | 'boss10' | 'offer';
};

const methods = [
  ['业务理解', '先确认目标、人群与真正需要解决的问题。', '六城市场经营'],
  ['问题判断', '在限制条件中找到值得投入的核心动作。', '区域策略与品牌议题'],
  ['品牌表达', '把判断转化为用户愿意理解和参与的内容。', '内容 IP 与公益传播'],
  ['资源组织', '谈清权益、职责、节奏和交付边界。', '合作谈判与跨团队协同'],
  ['结果复盘', '用业务与传播结果校准下一次选择。', 'ROI、注册与活跃数据'],
];

const cases: CaseStudy[] = [
  {
    id: 'regional-market',
    title: '华南六城区域市场经营',
    category: '区域市场 / 经营管理',
    role: '区域市场负责人 / 策略规划 / 团队与预算管理',
    challenge: '六个城市所处阶段、客户结构和市场环境不同，区域市场不能依赖一套活动模板，也不能只追求短期场次和曝光。',
    judgement: '以城市目标和客户需求为起点，分别配置活动、渠道与客户运营动作，同时用统一预算和复盘机制管理区域效率。',
    actions: [
      '负责深圳、东莞、惠州等华南六城市场规划，统筹年度预算、项目节奏与三人团队。',
      '结合城市特点设计客户活动、行业合作与品牌内容，并协调销售及外部资源推进落地。',
      '建立活动注册、客户反馈、商机与投入产出复盘，持续调整项目组合。',
    ],
    results: [
      '覆盖华南六个城市，年均统筹 30+ 场市场活动。',
      '区域活动整体 ROI 提升 110%，活动注册提升 40%。',
      '从单场执行逐步承担区域策略、预算与团队管理职责。',
    ],
    metrics: [
      { value: '6城', label: '区域覆盖' },
      { value: '30+', label: '年均活动' },
      { value: '+110%', label: '整体 ROI' },
    ],
    visual: 'regional',
  },
  {
    id: 'workbuddy-linkfox',
    title: 'WorkBuddy × LinkFox',
    category: 'AI 产品生态合作',
    role: '合作谈判 / 机制设计 / 项目统筹 / 用户运营',
    challenge: '两个产品有不同用户基础和使用场景，合作不能停留在互换曝光，需要同时解决新用户获取和存量用户激活。',
    judgement: '把合作权益与真实产品任务绑定：新用户完成注册安装，存量用户完成一次真实经营任务，让传播、体验和转化落在同一条路径上。',
    actions: [
      '负责合作沟通与方案谈判，明确双方权益、参与门槛、规则和交付节奏。',
      '统筹产品、技术、设计、内容与渠道团队，推动两期活动从方案进入正式上线。',
      '建立传播、访问、注册、调用和活跃数据链路，并根据上线反馈调整规则与页面。',
    ],
    results: [
      '两期联合活动完成上线，形成可复用的生态合作机制。',
      '活动带来 2,069 次渠道注册，活动后 13 个工作日内产生 149,743 次产品调用。',
      '累计形成 16,443 次可统计传播触点。',
    ],
    metrics: [
      { value: '2,069', label: '渠道注册' },
      { value: '149,743', label: '产品调用' },
      { value: '16,443', label: '传播触点' },
    ],
    media: '/media/workbuddy-linkfox-hero.jpg',
    mediaAlt: 'WorkBuddy 与 LinkFox 联合活动主视觉',
  },
  {
    id: 'boss10',
    title: '我的老板10后',
    category: '原创内容 IP',
    role: '项目发起 / 内容策划 / 项目总控 / 传播统筹',
    challenge: '区域品牌内容长期偏功能传播，需要一个既能体现年轻职场议题、又能获得公司级传播的原创项目。',
    judgement: '让 10 后孩子临时成为“老板”，用代际反差讨论工作与管理；内容本身承担品牌表达，不依赖硬性植入。',
    actions: [
      '发起项目并完成主题、人物关系、观点方向和内容结构设计。',
      '统筹拍摄、现场执行、包装剪辑和传播节奏，协调内部团队完成交付。',
      '推动内容进入官方微博、微信和视频渠道，形成公司级分发。',
    ],
    results: [
      '成为首个获得公司级分发的区域原创内容项目。',
      '零付费投放，24 小时获得 5 万+ 曝光。',
      '项目沉淀为区域内容营销标杆案例。',
    ],
    metrics: [
      { value: '0', label: '付费投放' },
      { value: '5万+', label: '24h 曝光' },
      { value: '1st', label: '区域公司级分发' },
    ],
    visual: 'boss10',
  },
  {
    id: 'echo',
    title: 'ECHO 年度项目',
    category: '大型品牌活动',
    role: '项目统筹 / 资源协调 / 现场交付',
    challenge: '年度合作伙伴项目参与方多、现场环节复杂，同时需要兼顾客户关系、品牌体验与线上传播。',
    judgement: '把活动拆成招商邀约、内容流程、嘉宾协同、场地制作、直播传播和现场应急六条工作流，用同一里程碑管理交付。',
    actions: [
      '统筹活动方案、嘉宾与客户邀约、供应商执行、直播流程和现场交付。',
      '协调销售、品牌、设计、采购与外部团队，统一节点和验收标准。',
      '管理关键风险与现场问题，确保项目按计划完成。',
    ],
    results: [
      '活动到场 1,200+ 人，覆盖 500+ 家企业。',
      '获得 10 万+ 自然社交传播曝光。',
      '项目获得 CEO 点名认可；同年获得公司期权，两者不作直接因果表述。',
    ],
    metrics: [
      { value: '1,200+', label: '到场人数' },
      { value: '500+', label: '企业参与' },
      { value: '10万+', label: '自然曝光' },
    ],
    media: '/media/echo-event.jpg',
    mediaAlt: 'ECHO 合作伙伴大会活动现场',
  },
  {
    id: 'offer',
    title: 'OFFER 公益计划',
    category: '公益创意传播',
    role: '创意策划 / 项目推进 / 渠道联动',
    challenge: '把招聘品牌的公共议题从一次传播活动，做成用户愿意参与、城市能够看见、团队可以复制的项目。',
    judgement: '用作品征集连接用户表达，再把优质内容带到线下公共媒介，形成“参与—展示—二次讨论”的传播闭环。',
    actions: [
      '参与主题创意、参与机制、内容征集与传播节奏设计。',
      '协调线上内容、用户运营与地铁媒体资源，推动作品从征集进入城市展示。',
      '整理执行方式与复盘，支持模式在其他城市复用。',
    ],
    results: [
      '活动形成 10 万+ 互动热度，征集 100+ 份作品。',
      '15 组内容进入深圳地铁展示，带来 2 万+ 二次传播热度。',
      '项目模式后续复制至北京、上海。',
    ],
    metrics: [
      { value: '10万+', label: '互动热度' },
      { value: '15', label: '地铁展示' },
      { value: '3城', label: '项目复制' },
    ],
    visual: 'offer',
  },
];

const storyGroups = [
  {
    number: '01',
    question: '如何把区域市场做深？',
    introduction: '不复制一套活动模板，而是理解不同城市、客户与业务阶段，再决定资源投向。',
    caseIds: ['regional-market'],
  },
  {
    number: '02',
    question: '如何让品牌内容被看见？',
    introduction: '从值得讨论的真实议题出发，让内容本身承担品牌表达，并设计用户参与和二次传播。',
    caseIds: ['boss10', 'offer'],
  },
  {
    number: '03',
    question: '如何把复杂合作推进落地？',
    introduction: '把多方目标拆成共同机制、明确节点和可验收结果，让合作不止停在方案与曝光。',
    caseIds: ['echo', 'workbuddy-linkfox'],
  },
];

const valueProofs = [
  ['理解业务，不只接收传播需求', '从六城市场经营到当前产品合作，我会先判断业务目标、人群与限制，再决定需要什么品牌和市场动作。', '区域市场 / 产品合作'],
  ['把抽象判断变成内容与项目', '从《我的老板10后》到 OFFER 公益计划，把品牌议题转化为具体内容、参与机制与传播路径。', '内容 IP / 公益传播'],
  ['组织复杂资源并对交付负责', '长期协调销售、产品、技术、设计、供应商与外部伙伴，处理预算、节点、谈判和现场风险。', 'ECHO / 六城市场 / 生态合作'],
];

function ProjectVisual({ visual, compact = false }: { visual: 'regional' | 'boss10' | 'offer'; compact?: boolean }) {
  if (visual === 'regional') {
    return (
      <div className={`type-visual regional-visual${compact ? ' is-compact' : ''}`} aria-label="华南六城区域市场经营数据视觉">
        <span className="type-visual-kicker">REGIONAL MARKET / SOUTH CHINA</span>
        <strong>06</strong><b>CITIES</b>
        <div className="regional-cities"><span>深圳</span><span>东莞</span><span>惠州</span><span>珠海</span><span>中山</span><span>佛山</span></div>
        <div className="type-visual-data"><span>30+ / YEAR</span><span>ROI +110%</span><span>REGISTRATION +40%</span></div>
      </div>
    );
  }
  if (visual === 'boss10') {
    return (
      <div className={`type-visual boss10-visual${compact ? ' is-compact' : ''}`} aria-label="我的老板10后项目数据视觉">
        <span className="type-visual-kicker">ORIGINAL CONTENT IP</span>
        <strong>我的老板</strong>
        <b>10</b>
        <em>后</em>
        <div className="type-visual-data"><span>0 PAID</span><span>24H</span><span>50K+</span></div>
      </div>
    );
  }

  return (
    <div className={`type-visual offer-visual${compact ? ' is-compact' : ''}`} aria-label="OFFER 公益计划数据视觉">
      <span className="type-visual-kicker">PUBLIC CAMPAIGN</span>
      <strong>OFFER</strong>
      <b>让好作品<br />进入城市</b>
      <div className="offer-track" aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="type-visual-data"><span>100K+</span><span>15 METRO</span><span>3 CITIES</span></div>
    </div>
  );
}

export default function Home() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const setProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', `${max > 0 ? window.scrollY / max : 0}`);
    };
    window.addEventListener('scroll', setProgress, { passive: true });
    setProgress();

    if (mediaQuery.matches) return () => window.removeEventListener('scroll', setProgress);

    const context = gsap.context(() => {
      gsap.from('.hero-copy-piece', { y: 22, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' });
      gsap.from('.badge-stage', { y: 28, opacity: 0, duration: 0.9, delay: 0.18, ease: 'power3.out' });
      gsap.utils.toArray<HTMLElement>('.portfolio-card').forEach((card) => {
        gsap.fromTo(card, { y: 54, opacity: 0.7 }, {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: { trigger: card, start: 'top 94%', end: 'top 64%', scrub: 0.7 },
        });
      });
      gsap.utils.toArray<HTMLElement>('.method-node').forEach((node, index) => {
        gsap.from(node, {
          x: index % 2 === 0 ? -28 : 28,
          opacity: 0.35,
          scrollTrigger: { trigger: node, start: 'top 82%', end: 'top 62%', scrub: true },
        });
      });
    });

    return () => {
      context.revert();
      window.removeEventListener('scroll', setProgress);
    };
  }, []);

  useEffect(() => {
    if (!selectedCase) return;
    previousFocusRef.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedCase(null);
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previousFocusRef.current?.focus();
    };
  }, [selectedCase]);

  return (
    <main id="top">
      <a className="skip-link" href="#work">跳到主要内容</a>
      <div className="reading-progress" aria-hidden="true" />

      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="返回顶部">VINCE WONG</a>
        <nav aria-label="主导航">
          <a href="#work">项目</a>
          <a href="#career">经历</a>
          <a href="#capabilities">能力</a>
          <a href="#about">关于</a>
        </nav>
        <a className="nav-contact" href="mailto:343906130@qq.com">联系我 <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-eyebrow hero-copy-piece">BRAND MANAGEMENT / MARKET OPERATION</p>
            <div className="hero-identity hero-copy-piece">
              <span className="hero-acid" aria-hidden="true" />
              <h1 id="hero-title" className="hero-name"><span>黄</span><span>威</span></h1>
              <span className="hero-asterisk" aria-hidden="true">*</span>
            </div>
            <p className="hero-latin hero-copy-piece">VINCE WONG</p>
            <p className="hero-position hero-copy-piece">品牌经理 / 市场运营</p>
            <p className="hero-statement hero-copy-piece">理解业务，建立表达，组织资源。<br />把品牌判断推进为真实的市场结果。</p>
            <div className="hero-actions hero-copy-piece">
              <a className="hero-primary" href="#work">查看代表项目 <span aria-hidden="true">↗</span></a>
              <a className="hero-secondary" href="/Vince-resume.pdf" download>下载简历 <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <SwingingBadge />
        </div>
      </section>

      <section className="evidence-strip" aria-label="职业概览">
        <div><strong>7+</strong><span>年品牌与市场经验</span></div>
        <div><strong>6城</strong><span>区域市场经营</span></div>
        <div><strong>30+</strong><span>年均统筹市场项目</span></div>
        <p>从一线市场执行，到区域经营、内容项目、品牌管理与生态合作。</p>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-title">
        <div className="work-heading editorial-heading">
          <div><span>SELECTED WORK / 2019—NOW</span><h2 id="work-title">三个问题，<br />五个真实项目。</h2></div>
          <p>项目类型不同，但背后是一套稳定的工作逻辑：理解业务，形成判断，组织资源，把结果做出来。</p>
        </div>
        <div className="story-list">
          {storyGroups.map((group) => {
            const groupCases = group.caseIds.map((id) => cases.find((item) => item.id === id)!).filter(Boolean);
            return (
              <section className={`story-group story-${group.number}`} key={group.number} aria-labelledby={`story-${group.number}`}>
                <div className="story-intro"><span>{group.number}</span><h3 id={`story-${group.number}`}>{group.question}</h3><p>{group.introduction}</p></div>
                <div className={`story-projects${groupCases.length === 1 ? ' is-single' : ''}`}>
                  {groupCases.map((item, index) => (
                    <article className={`portfolio-card${index === 0 ? ' is-lead' : ' is-support'}`} key={item.id}>
                      <button type="button" onClick={() => setSelectedCase(item)} aria-label={`查看 ${item.title} 完整案例`}>
                        <div className="portfolio-media">{item.media ? <img src={item.media} alt={item.mediaAlt} loading="lazy" /> : <ProjectVisual visual={item.visual!} />}</div>
                        <div className="portfolio-copy">
                          <div className="portfolio-meta"><span>{item.category}</span><span>VIEW CASE ↗</span></div>
                          <h4>{item.title}</h4><p>{item.role}</p>
                          <div className="portfolio-metrics">{item.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="method-section" aria-labelledby="method-title">
        <div className="method-heading"><span>HOW I WORK</span><h2 id="method-title">项目不同，<br />判断路径相同。</h2><p>方法不是先于项目的口号，而是从一次次真实交付中沉淀出来的工作习惯。</p></div>
        <div className="method-path">
          <div className="method-line" aria-hidden="true" />
          {methods.map(([title, copy, proof], index) => (
            <article className="method-node" key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p><small>{proof}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="career-section" id="career" aria-labelledby="career-title">
        <div className="career-lead">
          <h2 id="career-title">从区域市场，<br />走向品牌与生态。</h2>
          <p>经历的变化，不是频繁换赛道，而是从单点活动执行逐步走向品牌管理、资源合作和复杂项目统筹。</p>
        </div>
        <div className="timeline">
          <article><time>2026.08 — 至今</time><div><h3>紫讯科技</h3><strong>品牌运营 · AI 产品与生态合作</strong></div><p>参与企业与产品品牌规划；负责 LinkFox 与 WorkBuddy 生态合作、合作谈判、用户运营及跨部门项目推进。</p></article>
          <article><time>2021.04 — 2025.11</time><div><h3>BOSS直聘</h3><strong>华南区域市场负责人</strong></div><p>覆盖 6 个城市，管理千万级年度预算与 3 人团队；年均统筹 30+ 场活动，整体 ROI 提升 110%，活动注册提升 40%。</p></article>
          <article><time>2019.02 — 2021.03</time><div><h3>深圳新纪元国际教育</h3><strong>市场策划</strong></div><p>负责区域市场推广、活动策划与渠道拓展，建立从获客活动到线索转化的基础经验。</p></article>
          <article><time>2018.03 — 2019.02</time><div><h3>广州星亮</h3><strong>市场运营</strong></div><p>从一线市场执行进入互联网营销与用户运营，建立对现场、内容和渠道协同的基本判断。</p></article>
        </div>
      </section>

      <section className="value-section" id="capabilities" aria-labelledby="capability-title">
        <div className="value-heading"><span>TRANSFERABLE VALUE</span><h2 id="capability-title">换一个业务场景，<br />依然能带走的能力。</h2></div>
        <div className="value-list">
          {valueProofs.map(([title, proof, source], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{proof}</p><small>{source}</small></div></article>)}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-title">
        <div className="about-photo"><img src="/media/vince-candid.jpg" alt="黄威 Vince 的生活照片" loading="lazy" /></div>
        <div className="about-copy">
          <h2 id="about-title">技术背景，<br />品牌视角。</h2>
          <p>计算机科学与技术本科。这个背景没有把我变成工程师，却让我习惯理解产品逻辑、系统关系和数据链路。做品牌和市场时，我更关心一件事如何真正跑起来，而不是停在概念里。</p>
          <p>我喜欢需要判断、协调和落地的工作：既能把复杂信息说清楚，也愿意进入细节，把人和资源组织起来。</p>
          <div className="about-facts"><span>东莞理工学院</span><span>计算机科学与技术</span><span>Base 深圳</span></div>
        </div>
      </section>

      <footer className="site-footer" id="contact">
        <p>如果你正在找一个能把品牌、合作和项目真正接起来的人。</p>
        <a href="mailto:343906130@qq.com">聊聊具体问题 <span aria-hidden="true">↗</span></a>
        <div className="footer-bottom"><span>黄威 VINCE</span><span>343906130@qq.com</span><a href="#top">回到顶部 ↑</a></div>
      </footer>

      {selectedCase && (
        <div className="case-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCase(null); }}>
          <div className="case-dialog" role="dialog" aria-modal="true" aria-labelledby="case-title" ref={dialogRef}>
            <button className="case-close" type="button" ref={closeRef} onClick={() => setSelectedCase(null)}>关闭 <span aria-hidden="true">×</span></button>
            <div className="case-hero">{selectedCase.media ? <img src={selectedCase.media} alt={selectedCase.mediaAlt} /> : <ProjectVisual visual={selectedCase.visual!} />}</div>
            <div className="case-content">
              <div className="case-heading"><span>{selectedCase.category}</span><h2 id="case-title">{selectedCase.title}</h2><p>{selectedCase.role}</p></div>
              <div className="case-metrics">{selectedCase.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>
              <div className="case-block"><h3>问题与目标</h3><p>{selectedCase.challenge}</p></div>
              <div className="case-block"><h3>我的判断</h3><p>{selectedCase.judgement}</p></div>
              <div className="case-block"><h3>我负责的工作</h3><ol>{selectedCase.actions.map((action) => <li key={action}>{action}</li>)}</ol></div>
              <div className="case-block case-result"><h3>关键结果</h3><ol>{selectedCase.results.map((result) => <li key={result}>{result}</li>)}</ol></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
