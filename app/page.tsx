'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DragFilmstrip from './DragFilmstrip';
import SwingingBadge from './SwingingBadge';

const proofs = [['7+', '年品牌与市场经验'], ['6城', '区域市场经营'], ['1,000万+', '年度预算管理'], ['30+', '年均市场项目']];
const capabilities = [
  ['01', '区域品牌经营', '以城市和业务阶段为单位，配置活动、渠道与客户运营动作。', '华南六城 / ROI +110%'],
  ['02', '内容与 IP 策划', '从真实议题出发，把品牌判断转化为用户愿意参与的内容。', '《我的老板10后》'],
  ['03', '合作谈判与资源整合', '谈清目标、权益和交付边界，把外部资源变成共同结果。', 'OFFER / WorkBuddy × LinkFox'],
  ['04', '大型项目统筹', '拆解复杂工作流，管理预算、节点、协作与现场风险。', 'ECHO 2024'],
];
const bossImages = [
  ['/media/boss10-01.webp', '《我的老板10后》节目中10后小老板讨论职场热词'],
  ['/media/boss10-02.webp', '10后小老板在节目中分享对躺平的看法'],
  ['/media/boss10-03.webp', '《我的老板10后》多人户外录制现场'],
  ['/media/boss10-04.webp', '节目中10后小老板与职场嘉宾互动'],
];

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--progress', `${max ? window.scrollY / max : 0}`);
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    if (reduced) return () => window.removeEventListener('scroll', updateProgress);
    const context = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 28, opacity: 0, stagger: 0.08, duration: 0.75, ease: 'expo.out' });
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, { y: 42, opacity: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } });
      });
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        gsap.fromTo(element, { yPercent: -3 }, { yPercent: 3, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    });
    return () => { context.revert(); window.removeEventListener('scroll', updateProgress); };
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">跳到代表项目</a><div className="reading-progress" aria-hidden="true" />
      <header className="site-nav"><a href="#top" className="wordmark">V/W</a><nav aria-label="主要导航"><a href="#work">作品</a><a href="#current">当前工作</a><a href="#experience">经历</a><a href="#about">关于</a></nav><a className="nav-resume" href="/Vince-resume.pdf" download>简历 ↓</a></header>
      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow hero-reveal">BRAND MANAGEMENT / MARKET OPERATION</p>
            <h1 className="hero-reveal"><span>黄</span><i aria-hidden="true" /><span>威</span><sup>*</sup></h1>
            <p className="latin hero-reveal">VINCE WONG</p><p className="hero-role hero-reveal">品牌经理 / 市场运营</p>
            <p className="hero-statement hero-reveal">理解业务，建立表达，组织资源。<br />把品牌判断推进为真实的市场结果。</p>
            <div className="hero-actions hero-reveal"><a href="#work">查看代表项目 ↘</a><a href="/Vince-resume.pdf" download>下载简历 ↓</a></div>
          </div>
          <SwingingBadge /><p className="drag-note">DRAG THE BADGE — 拖动工牌</p>
        </section>

        <section className="proof" aria-label="职业证据">
          <div className="proof-grid">{proofs.map(([value, label]) => <div key={label} data-reveal><strong>{value}</strong><span>{label}</span></div>)}</div>
          <p data-reveal>从一线市场执行，到区域经营、内容项目、品牌管理与产品合作。</p>
        </section>

        <section className="capabilities" aria-labelledby="capability-title">
          <div className="section-head" data-reveal><span>WHAT I DO / 01</span><h2 id="capability-title">我擅长的，<br />不是一张技能清单。</h2><p>能力只有落到项目里才有意义。以下四件事，构成我处理品牌与市场问题的基本方式。</p></div>
          <div className="capability-list">{capabilities.map(([no, title, copy, evidence]) => <article key={title} data-reveal><span>{no}</span><h3>{title}</h3><p>{copy}</p><small>{evidence} ↗</small></article>)}</div>
        </section>

        <section className="selected" id="work" aria-labelledby="work-title">
          <div className="section-head work-head" data-reveal><span>SELECTED WORK / 02</span><h2 id="work-title">三个项目，<br />三种解决问题的方式。</h2><p>内容 IP、年度大项目与城市公益传播。先看结果，再进入我在其中做出的判断。</p></div>
          <div className="work-index">
            <a className="work-item boss-index" href="#boss10" data-reveal><div className="boss-stack">{bossImages.slice(0,3).map(([src, alt]) => <img src={src} alt={alt} key={src} loading="lazy" />)}</div><div><span>01 / ORIGINAL CONTENT IP</span><h3>我的老板10后</h3><p>项目发起 · 内容策划 · 项目总控</p><strong>0 投放 / 24h 5万+曝光</strong></div></a>
            <a className="work-item echo-index" href="#echo" data-reveal><div className="index-image"><img src="/media/echo-01.webp" alt="ECHO 2024 四方来才活动现场观众全景" loading="lazy" data-parallax /></div><div><span>02 / ANNUAL EVENT</span><h3>ECHO 2024<br />四方来才</h3><p>项目总负责人 · 百万级预算</p><strong>1,200+到场 / 500+企业</strong></div></a>
            <a className="work-item offer-index" href="#offer" data-reveal><div className="index-image"><img src="/media/offer-03.webp" alt="OFFER 公益计划在深圳地铁的长廊展示" loading="lazy" data-parallax /></div><div><span>03 / PUBLIC CAMPAIGN</span><h3>这份作品值得<br />一个 OFFER</h3><p>创意策划 · 资源联动 · 项目复制</p><strong>100+投稿 / 15组地铁展示</strong></div></a>
          </div>
        </section>

        <section className="case boss-case" id="boss10">
          <header className="case-title" data-reveal><span>CASE 01 / CONTENT IP</span><h2>《我的老板10后》</h2><p>让“10后当老板”的代际反差，成为一场轻松但不轻飘的职场讨论。</p></header>
          <DragFilmstrip images={bossImages} />
          <div className="case-story">
            <article data-reveal><span>BACKGROUND</span><h3>为什么做</h3><p>区域品牌内容长期偏功能传播。我希望在不依赖投放的前提下，做一档具备话题性、品牌表达和长期复用空间的原创内容。</p></article>
            <article data-reveal><span>JUDGEMENT</span><h3>我的判断</h3><p>“10后当老板”天然带有代际碰撞与节奏感。用孩子的直觉讨论躺平、内卷、P安U和财富自由，让内容本身承担品牌表达。</p></article>
            <article data-reveal><span>MY ROLE</span><h3>我负责的工作</h3><p>从 0 到 1 发起并策划项目，统筹内容结构、拍摄、现场执行、包装剪辑和上线节奏；协调内容、品牌、运营、设计及法务团队，并推动公司级分发。</p></article>
            <article className="result" data-reveal><span>RESULT</span><strong>0</strong><p>付费投放</p><strong>5万+</strong><p>上线 24 小时曝光</p></article>
          </div>
        </section>

        <section className="case echo-case" id="echo">
          <div className="echo-hero"><img src="/media/echo-01.webp" alt="ECHO 2024 四方来才活动现场全景" loading="lazy" data-parallax /><div><span>CASE 02 / ANNUAL EVENT</span><h2>ECHO 2024<br />四方来才</h2><p>总负责人 / 百万级预算</p></div></div>
          <div className="case-story compact">
            <article data-reveal><span>BACKGROUND</span><h3>不只是一场招聘会</h3><p>以更大的现场连接优秀人才与优质企业，让内容、体验和品牌势能共同形成年度人才 IP。</p></article>
            <article data-reveal><span>MY ROLE</span><h3>对全链路负责</h3><p>统筹策略、预算、资源、团队与执行，从定位议程、招商合作、内容舞台，到现场运营、传播与收尾。</p></article>
            <article className="result echo-result" data-reveal><span>RESULT</span><strong>1,200+</strong><p>现场到场</p><strong>500+</strong><p>参与企业</p><strong>10万+</strong><p>自然曝光</p></article>
          </div>
          <div className="echo-gallery"><figure data-reveal><img src="/media/echo-03.webp" alt="ECHO 2024 舞台交响乐演出现场" loading="lazy" /><figcaption>把人才议题做成可感知的年度现场。</figcaption></figure><figure data-reveal><img src="/media/echo-02.webp" alt="ECHO 2024 项目团队舞台合影" loading="lazy" /><figcaption>复杂度越高，越依赖清晰的节点与稳定的团队协作。</figcaption></figure></div>
        </section>

        <section className="case offer-case" id="offer">
          <header className="case-title" data-reveal><span>CASE 03 / PUBLIC CAMPAIGN</span><h2>这份作品值得<br />一个 OFFER</h2><p>用创意为求职者发声，把好作品送上城市舞台。</p></header>
          <div className="offer-panorama"><img src="/media/offer-03.webp" alt="OFFER 公益计划在深圳地铁长廊的展示现场" loading="lazy" data-parallax /></div>
          <div className="offer-sequence">{[['/media/offer-01.webp','地铁灯箱中的宠物主题摄影作品'],['/media/offer-02.webp','地铁灯箱中的猫咪摄影作品'],['/media/offer-04.webp','地铁长廊中的设计作品展示']].map(([src, alt], index) => <figure data-reveal key={src}><img src={src} alt={alt} loading="lazy" /><figcaption>0{index + 1} / 从线上征集进入真实城市空间</figcaption></figure>)}</div>
          <div className="case-story compact offer-story">
            <article data-reveal><span>IDEA</span><h3>重新定义“竞争力”</h3><p>以求职者公益创意征集作品，为真实创作者提供表达与被看见的机会。</p></article>
            <article data-reveal><span>RESOURCE</span><h3>让传播进入城市</h3><p>联动深圳地铁等城市媒体资源，把优秀作品从社交内容转为公共场景。</p></article>
            <article className="result" data-reveal><span>RESULT</span><strong>100+</strong><p>作品投稿</p><strong>15组</strong><p>深圳地铁展示</p><strong>3城</strong><p>复制至深圳、上海、北京</p></article>
          </div>
        </section>

        <section className="current" id="current">
          <div className="section-head" data-reveal><span>CURRENT WORK / 03</span><h2>现在，我在把品牌方法<br />带进新的产品场景。</h2></div>
          <div className="current-grid">
            <article className="brand-planning" data-reveal><span>紫讯品牌规划</span><h3>从产品与市场的交汇点出发，参与品牌定位、架构、核心表达与材料统一。</h3><p>这是当前工作的基础建设，仍在持续推进，因此只做保守呈现。</p></article>
            <article className="workbuddy" data-reveal><img src="/media/workbuddy-linkfox-hero.jpg" alt="WorkBuddy 与 LinkFox 联合活动主视觉" loading="lazy" /><div><span>ECOSYSTEM PARTNERSHIP</span><h3>WorkBuddy × LinkFox</h3><p>负责合作谈判、活动机制与跨部门推进，让合作从权益交换进入真实产品使用。</p><div className="inline-metrics"><strong>2,069<small>渠道注册</small></strong><strong>149,743<small>产品调用</small></strong></div></div></article>
          </div>
        </section>

        <section className="experience" id="experience">
          <div className="section-head" data-reveal><span>EXPERIENCE / 04</span><h2>经历不是时间线，<br />而是能力边界的变化。</h2></div>
          <div className="experience-list">
            <article data-reveal><span>NOW</span><h3>紫讯科技</h3><p>从区域市场走向品牌管理、产品合作与生态谈判。</p></article>
            <article data-reveal><span>2019—2026</span><h3>BOSS直聘</h3><p>从一线执行到华南六城经营，管理团队、年度预算与公司级内容和活动项目。</p></article>
            <article data-reveal><span>EARLY YEARS</span><h3>市场与现场</h3><p>在更早的项目中积累资源合作、活动执行和用户沟通的基本功。</p></article>
          </div>
        </section>

        <section className="about" id="about">
          <div className="about-image"><img src="/media/vince-portrait.webp" alt="黄威 Vince 的正式职业肖像" loading="lazy" /></div>
          <div className="about-copy" data-reveal><span>ABOUT / 05</span><h2>用计算机的视角理解产品，<br />用品牌与市场的视角创造用户价值。</h2><p>计算机科学与技术本科，让我能更快进入技术产品语境；长期市场实践，则让我习惯从用户、业务和落地条件出发做判断。</p><p>我关心的不只是“怎么传播”，而是一个品牌为何值得被理解、如何组织资源，以及最后是否产生真实结果。</p><div className="contact"><a href="mailto:343906130@qq.com">343906130@qq.com ↗</a><a href="/Vince-resume.pdf" download>下载公开简历 ↓</a></div></div>
        </section>
      </main>
      <footer><span>黄威 VINCE WONG</span><span>BRAND / MARKET / PROJECT</span><a href="#top">BACK TO TOP ↑</a></footer>
    </>
  );
}
