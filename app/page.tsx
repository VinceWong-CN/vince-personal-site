'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DragFilmstrip from './DragFilmstrip';
import SwingingBadge from './SwingingBadge';

const bossImages = [
  ['/media/boss10-01.webp', '《我的老板10后》节目中10后小老板讨论职场热词'],
  ['/media/boss10-02.webp', '10后小老板分享对躺平的看法'],
  ['/media/boss10-03.webp', '《我的老板10后》多人户外录制现场'],
  ['/media/boss10-04.webp', '10后小老板与职场嘉宾互动'],
];

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.from(el, { y: 26, opacity: 0, duration: .7, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } })));
    return () => context.revert();
  }, []);

  return <main>
    <section className="chapter hero" id="top">
      <div className="hero-copy"><p className="kicker">BRAND MANAGEMENT / MARKET OPERATION</p><h1><span>黄</span><span>威</span><sup>*</sup><i aria-hidden="true" /></h1><p className="hero-en">VINCE WONG</p><p className="hero-role">品牌经理 / 市场运营</p><p className="hero-line">理解业务，建立表达，组织资源。<br />把品牌判断推进为真实的市场结果。</p><div className="hero-links"><a href="#work">查看代表项目 ↘</a><a href="/Vince-resume.pdf" download>下载简历 ↓</a></div></div>
      <SwingingBadge /><p className="drag-tip">DRAG THE BADGE / 拖动工牌</p>
    </section>

    <section className="chapter proof" id="capabilities">
      <div className="chapter-top"><b>VINCE WONG&nbsp; //</b><span>CAREER PROOF &amp; CAPABILITY OVERVIEW</span></div><h2>职业证明与能力概览</h2>
      <div className="proof-numbers"><div className="proof-short"><strong>7+</strong><p>年品牌与<br />市场经验</p></div><div className="proof-city"><strong>6城</strong><p>区域市场<br />经营</p></div><div className="proof-budget"><strong>1,000万+</strong><p>年度预算<br />管理</p></div><div className="proof-short"><strong>30+</strong><p>年均<br />市场项目</p></div></div>
      <div className="capability-lines"><article><h3>区域品牌经营 <em>/</em></h3><p>以城市为单元，搭建品牌落地与增长体系，提升区域影响力与业务转化。<small>项目：华南六城 / ROI +110%</small></p></article><article><h3>内容与IP策划 <em>/</em></h3><p>以内容与IP驱动品牌声量与用户连接，打造可持续的传播资产。<small>项目：《我的老板10后》</small></p></article><article><h3>合作谈判与资源整合 <em>/</em></h3><p>识别关键资源并达成高效合作，整合品牌、媒体、渠道与场地等多方资源。<small>项目：OFFER / WorkBuddy × LinkFox</small></p></article><article><h3>大型项目统筹 <em>/</em></h3><p>统筹策略、资源、执行与落地，推动高复杂度项目高质量完成。<small>项目：ECHO 2024 四方来才</small></p></article></div>
    </section>

    <section className="chapter selected" id="work">
      <div className="selected-title"><span>SELECTED WORK / 02</span><h2><i>三个项目，</i><i>三种解决问题的方式。</i></h2><p>内容IP、年度大项目与城市公益传播。<br />先看结果，再进入我在其中做出的判断。</p></div>
      <div className="selected-collage"><a href="#boss10" className="selected-boss"><div>{bossImages.slice(0,3).map(([src,alt]) => <img key={src} src={src} alt={alt} />)}</div><span>01 / ORIGINAL CONTENT IP</span><h3>我的老板10后</h3><p>项目发起 · 内容策划 · 项目总控</p><b>0投放 / 24h 5万+曝光</b></a><a href="#echo" className="selected-echo"><img src="/media/echo-01.webp" alt="ECHO 2024活动现场" /><span>02 / ANNUAL EVENT</span><h3>ECHO 2024 四方来才</h3><b>1,200+到场 / 500+企业</b></a><a href="#offer" className="selected-offer"><img src="/media/offer-03.webp" alt="OFFER公益计划地铁长廊展示" /><span>03 / PUBLIC CAMPAIGN</span><h3>这份作品值得一个OFFER</h3><b>100+投稿 / 15组地铁展示</b></a></div>
    </section>

    <section className="chapter case boss" id="boss10">
      <div className="archive"><b>VINCE WONG //</b><span>ARCHIVE INDEX</span><nav><a href="#boss10">01 BOSS10</a><a href="#echo">02 ECHO</a><a href="#offer">03 OFFER</a></nav></div><div className="boss-intro"><span>CASE 01 / CONTENT IP</span><h2>我的老板<br />10后</h2><p>让“10后当老板”的代际反差，成为一场轻松但不轻飘的职场讨论。</p></div><DragFilmstrip images={bossImages} />
      <div className="boss-story"><article><span>BACKGROUND</span><h3>为什么做</h3><p>区域品牌内容长期偏功能传播。我希望在不依赖投放的前提下，做一档兼具话题性与品牌表达的原创内容。</p></article><article><span>JUDGEMENT</span><h3>我的判断</h3><p>“10后当老板”天然带有代际碰撞。用孩子的直觉讨论职场热词，让内容本身承担品牌表达。</p></article><article><span>MY ROLE</span><h3>我负责的工作</h3><p>从0到1发起并策划项目，统筹内容、拍摄、现场、包装剪辑与上线节奏，推动公司级分发。</p></article><article className="case-result"><span>RESULT</span><div><strong>0</strong><p>付费投放</p></div><div><strong>5万+</strong><p>上线24小时曝光</p></div></article></div>
    </section>

    <section className="chapter echo" id="echo">
      <div className="echo-cover"><img src="/media/echo-01.webp" alt="ECHO 2024现场观众全景" /><div><span>CASE 02 / ANNUAL EVENT</span><h2>ECHO 2024<br />四方来才</h2><p>项目总负责人 / 百万级预算</p></div></div>
      <div className="echo-summary"><article><span>BACKGROUND</span><h3>不只是一场招聘会</h3><p>让内容、体验和品牌势能共同形成年度人才IP。</p></article><article><span>MY ROLE</span><h3>对全链路负责</h3><p>统筹策略、预算、资源、团队与执行。</p></article><article><span>RESULT 01</span><strong>1,200+</strong><p>现场到场</p></article><article><span>RESULT 02</span><strong>500+</strong><p>参与企业</p></article><article><span>RESULT 03</span><strong>10万+</strong><p>自然曝光</p></article></div>
      <div className="echo-bottom"><figure><img src="/media/echo-03.webp" alt="ECHO舞台演出现场" /></figure><p>把人才议题<br />做成可感知的<br /><b>年度现场。</b></p><figure><img src="/media/echo-02.webp" alt="ECHO项目团队合影" /></figure><p>复杂度越高，<br />越依赖清晰节点与<br /><b>稳定协作。</b></p></div>
    </section>

    <section className="chapter offer" id="offer">
      <div className="offer-head"><div><span>CASE 03 / PUBLIC CAMPAIGN</span><h2>这份作品值得<br />一个OFFER</h2></div><p>用创意为求职者发声，<br />把好作品送上城市舞台。</p></div><img className="offer-hero" src="/media/offer-03.webp" alt="OFFER公益计划深圳地铁展示长廊" />
      <div className="offer-bottom"><div className="offer-images"><img src="/media/offer-01.webp" alt="宠物主题摄影作品地铁展示" /><img src="/media/offer-02.webp" alt="猫咪摄影作品地铁展示" /><img src="/media/offer-04.webp" alt="设计作品地铁展示" /></div><article><span>IDEA</span><h3>重新定义<br />“竞争力”</h3><p>为真实创作者提供表达与被看见的机会。</p></article><article><span>RESOURCE</span><h3>让传播<br />进入城市</h3><p>联动城市媒体资源，把作品带进公共空间。</p></article><div className="offer-metrics"><span>RESULT</span><strong>100+</strong><p>作品投稿</p><strong>15组</strong><p>深圳地铁展示</p><strong>3城</strong><p>深圳 / 上海 / 北京</p></div></div>
    </section>

    <section className="chapter final" id="current">
      <div className="current-block"><div className="current-title"><span>CURRENT WORK / 04</span><h2><i>现在，我把品牌方法</i><i>带进新的产品场景。</i></h2></div><article><span>紫讯品牌规划</span><h3>参与品牌定位、架构、核心表达与材料统一。</h3><p>基础建设仍在持续推进，保守呈现。</p></article><article className="wb"><img src="/media/workbuddy-linkfox-hero.jpg" alt="WorkBuddy与LinkFox联合活动" /><div><span>WORKBUDDY × LINKFOX</span><p>合作谈判、活动机制与跨部门推进</p><strong>2,069<small>渠道注册</small></strong><strong>149,743<small>产品调用</small></strong></div></article></div>
      <div className="career" id="experience"><span>EXPERIENCE / 05</span><h2><i>经历不是时间线，</i><i>而是能力边界的变化。</i></h2><div><article><b>NOW</b><h3>紫讯科技</h3><p>品牌管理、产品合作与生态谈判</p></article><article><b>2019—2026</b><h3>BOSS直聘</h3><p>华南六城经营、团队、预算与公司级项目</p></article><article><b>EARLY YEARS</b><h3>市场与现场</h3><p>资源合作、活动执行和用户沟通</p></article></div></div>
      <div className="about" id="about"><div><span>ABOUT / 06</span><h2><i>用技术理解产品，</i><i>用品牌创造价值。</i></h2><p>计算机科学与技术本科，让我更快进入技术产品语境；长期市场实践，让我从用户、业务和落地条件出发做判断。</p><nav><a href="mailto:343906130@qq.com">343906130@qq.com ↗</a><a href="/Vince-resume.pdf" download>下载简历 ↓</a></nav></div><img src="/media/vince-portrait-cutout.png" alt="黄威Vince职业肖像" /></div>
    </section>
  </main>;
}
