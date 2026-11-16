'use client';

import { useLayoutEffect, type MouseEvent } from 'react';
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
  const transitionToProject = (event: MouseEvent<HTMLAnchorElement>) => {
    const href = event.currentTarget.getAttribute('href');
    if (!href?.startsWith('#')) return;
    const target = document.querySelector<HTMLElement>(href);
    const source = event.currentTarget.classList.contains('selected-boss')
      ? event.currentTarget.querySelectorAll<HTMLImageElement>('img')[1]
      : event.currentTarget.querySelector<HTMLImageElement>('img');
    const destination = target?.querySelector<HTMLImageElement>('.filmstrip img, .echo-cover img, .offer-hero');
    if (!target || !source || !destination || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    event.preventDefault();
    const start = source.getBoundingClientRect();
    const clone = source.cloneNode(true) as HTMLImageElement;
    Object.assign(clone.style, {
      position: 'fixed', left: `${start.left}px`, top: `${start.top}px`, width: `${start.width}px`, height: `${start.height}px`,
      objectFit: 'cover', zIndex: '1000', pointerEvents: 'none', margin: '0', border: '0', borderRadius: '0',
    });
    document.body.appendChild(clone);
    document.body.dataset.transitioning = 'true';

    gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: () => {
        clone.remove();
        delete document.body.dataset.transitioning;
        history.replaceState(null, '', href);
      },
    })
      .to(clone, { left: 0, top: 0, width: innerWidth, height: innerHeight, duration: .48 })
      .call(() => {
        const previousScrollBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: 'start' });
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
      })
      .call(() => {
        const end = destination.getBoundingClientRect();
        gsap.to(clone, { left: end.left, top: end.top, width: end.width, height: end.height, duration: .58, ease: 'expo.inOut' });
      })
      .to({}, { duration: .58 });
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero .kicker', { y: 12, opacity: 0, duration: .55 })
        .from('.hero h1 span, .hero h1 sup', { yPercent: 55, opacity: 0, stagger: .08, duration: .85 }, '-=.3')
        .from('.hero h1 i', { scaleX: 0, transformOrigin: 'left center', duration: .65 }, '-=.65')
        .from('.hero-en', { clipPath: 'inset(0 100% 0 0)', duration: .8 }, '-=.45')
        .from('.hero-role, .hero-line, .hero-links', { y: 14, opacity: 0, stagger: .08, duration: .55 }, '-=.45');

      gsap.utils.toArray<HTMLElement>('.selected-collage a > img, .selected-boss > div, .echo-cover img, .offer-hero, .current-case-head img').forEach((el) => {
        if (el.getBoundingClientRect().bottom <= 0) return;
        gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: .85, ease: 'expo.out', clearProps: 'clipPath', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });

      gsap.utils.toArray<HTMLElement>('.echo-results article, .current-results article').forEach((el, index) => {
        if (el.getBoundingClientRect().bottom <= 0) return;
        gsap.from(el, { '--marker-scale': 0, duration: .45, delay: index % 3 * .07, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });

      const closing = document.querySelector<HTMLElement>('.closing-about');
      if (closing) gsap.timeline({ scrollTrigger: { trigger: closing, start: 'top 88%', once: true } })
        .from(closing, { '--footer-block': 0, duration: .4, ease: 'expo.out' })
        .from('.closing-about img', { y: 20, duration: .55, ease: 'expo.out' }, '-=.15')
        .from('.closing-about nav', { opacity: 0, duration: .3, ease: 'power2.out' }, '-=.2');

      const progressBar = document.querySelector<HTMLElement>('.reading-progress__bar');
      if (progressBar) gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true },
      });

      const progressLabel = document.querySelector<HTMLElement>('.reading-progress__label');
      gsap.utils.toArray<HTMLElement>('.chapter[id]').forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: ({ isActive }) => {
            if (isActive && progressLabel) progressLabel.textContent = `${String(index + 1).padStart(2, '0')} / ${section.id.toUpperCase()}`;
          },
        });
      });
    });
    return () => context.revert();
  }, []);

  return <main>
    <aside className="reading-progress" aria-hidden="true"><span className="reading-progress__label">01 / TOP</span><i><b className="reading-progress__bar" /></i></aside>
    <section className="chapter hero" id="top">
      <div className="hero-copy"><p className="kicker">BRAND MANAGEMENT / MARKET OPERATION</p><h1><span>黄</span><span>威</span><sup aria-hidden="true">*</sup><i aria-hidden="true" /></h1><p className="hero-en">VINCE WONG</p><p className="hero-role">品牌经理 / 市场运营</p><p className="hero-line">理解业务，建立表达，组织资源。<br />把品牌判断推进为真实的市场结果。</p><div className="hero-links"><a href="#work">查看代表项目 ↘</a><a href="/Vince-resume.pdf" download>下载简历 ↓</a></div></div>
      <SwingingBadge /><p className="drag-tip">DRAG THE BADGE</p>
    </section>

    <section className="chapter proof" id="capabilities">
      <div className="chapter-top"><b>VINCE WONG&nbsp; //</b><span>CAREER PROOF &amp; CAPABILITY OVERVIEW</span></div><h2>职业证明与能力概览</h2>
      <div className="proof-numbers"><div className="proof-short"><strong>7+</strong><p>年品牌与<br />市场经验</p></div><div className="proof-city"><strong>6城</strong><p>区域市场<br />经营</p></div><div className="proof-budget"><strong>1,000万+</strong><p>年度预算<br />管理</p></div><div className="proof-short"><strong>30+</strong><p>年均<br />市场项目</p></div></div>
      <div className="capability-lines"><article><h3>区域品牌经营 <em>/</em></h3><p>以城市为单元，搭建品牌落地与增长体系，提升区域影响力与业务转化。<small>项目：华南六城 / ROI +110%</small></p></article><article><h3>内容与IP策划 <em>/</em></h3><p>以内容与IP驱动品牌声量与用户连接，打造可持续的传播资产。<small>项目：《我的老板10后》</small></p></article><article><h3>合作谈判与资源整合 <em>/</em></h3><p>识别关键资源并达成高效合作，整合品牌、媒体、渠道与场地等多方资源。<small>项目：这份作品值得一个OFFER / WorkBuddy × LinkFox</small></p></article><article><h3>大型项目统筹 <em>/</em></h3><p>统筹策略、资源、执行与落地，推动高复杂度项目高质量完成。<small>项目：ECHO 2024 四方来才</small></p></article></div>
    </section>

    <section className="chapter selected" id="work">
      <div className="selected-title"><span>SELECTED WORK / 02</span><h2><i>三个项目，</i><i>三种解决问题的方式。</i></h2><p>内容IP、年度大项目与城市公益传播。<br />先看结果，再进入我在其中做出的判断。</p></div>
      <div className="selected-collage"><a href="#boss10" className="selected-boss" onClick={transitionToProject}><div>{bossImages.slice(0,3).map(([src,alt]) => <img key={src} src={src} alt={alt} />)}</div><span>01 / ORIGINAL CONTENT IP</span><h3>我的老板10后</h3><p>内容IP · 从0到1策划 · 项目总控</p><b>0投放 / 24h 5万+曝光</b></a><a href="#echo" className="selected-echo" onClick={transitionToProject}><img src="/media/echo-01.webp" alt="ECHO 2024活动现场" /><span>02 / ANNUAL EVENT</span><h3>ECHO 2024 四方来才</h3><p>年度IP · 全链路统筹 · 大型项目交付</p><b>1,200+到场 / 500+企业</b></a><a href="#offer" className="selected-offer" onClick={transitionToProject}><img src="/media/offer-03.webp" alt="OFFER公益计划地铁长廊展示" /><span>03 / PUBLIC CAMPAIGN</span><h3>这份作品值得一个OFFER</h3><p>公益创意 · 资源整合 · 跨城复制</p><b>100+投稿 / 15组地铁展示</b></a></div>
    </section>

    <section className="chapter case boss" id="boss10">
      <div className="archive"><b>VINCE WONG //</b><span>ARCHIVE INDEX</span><nav><a href="#boss10">01 BOSS10</a><a href="#echo">02 ECHO</a><a href="#offer">03 OFFER</a></nav></div><div className="boss-intro"><span>CASE 01 / CONTENT IP</span><h2>我的老板<br />10后</h2><p>让“10后当老板”的代际反差，成为一场轻松但不轻飘的职场讨论。</p></div><DragFilmstrip images={bossImages} />
      <div className="boss-story"><article><span>BACKGROUND</span><h3>为什么做</h3><p>希望在不依赖投放的前提下，打造兼具话题性与品牌表达的自有内容，并探索可长期运营的内容资产。</p></article><article><span>JUDGEMENT</span><h3>我的判断</h3><p>“10后当老板”兼具代际碰撞与职场话题性。用孩子的直觉讨论工作方式，让内容本身承担品牌表达。</p></article><article><span>MY ROLE</span><h3>我负责的工作</h3><p>作为项目负责人，从0到1完成选题与内容结构，统筹脚本、拍摄、现场、包装剪辑及公司级分发。</p></article><article className="case-result"><span>RESULT</span><div><strong>0</strong><p>付费投放</p></div><div><strong>5万+</strong><p>上线24小时曝光</p></div><small>沉淀可继续系列化运营的原创内容IP</small></article></div>
    </section>

    <section className="chapter echo" id="echo">
      <div className="echo-cover"><img src="/media/echo-01.webp" alt="ECHO 2024现场观众全景" /><div><span>CASE 02 / ANNUAL EVENT</span><h2>ECHO 2024<br />四方来才</h2><p>项目总负责人 / 百万级预算</p></div></div>
      <div className="echo-narrative"><article><span>BACKGROUND</span><h3>不只是一场招聘会</h3><p>在更大的规模上连接优秀人才与优质企业，让内容、体验与品牌势能共同形成年度人才IP。</p></article><article><span>JUDGEMENT</span><h3>一次人才生态聚合</h3><p>通过高质量内容与现场体验，同时提升企业端与人才端的参与价值。</p></article><article><span>PROGRAM LEAD</span><h3>以总负责人身份推进</h3><p>对项目目标、策略、预算、资源、团队、执行和结果负责。</p></article><article><span>DELIVERY</span><h3>管理复杂度，也管理结果</h3><p>推进定位、议程、招商合作、内容舞台、现场运营、传播与复盘全链路交付。</p></article></div>
      <div className="echo-results"><article><span>RESULT 01</span><strong>1,200+</strong><p>现场到场</p></article><article><span>RESULT 02</span><strong>500+</strong><p>参与企业</p></article><article><span>RESULT 03</span><strong>10万+</strong><p>全网自然曝光</p></article></div>
      <div className="echo-bottom"><figure><img src="/media/echo-03.webp" alt="ECHO舞台演出现场" /></figure><p>把人才议题<br />做成可感知的<br /><b>年度现场。</b></p><figure><img src="/media/echo-02.webp" alt="ECHO项目团队合影" /></figure><p>复杂度越高，<br />越依赖清晰节点与<br /><b>稳定协作。</b></p></div>
    </section>

    <section className="chapter offer" id="offer">
      <div className="offer-head"><div><span>CASE 03 / PUBLIC CAMPAIGN</span><h2>这份作品值得<br />一个OFFER</h2></div><p>用创意为求职者发声，<br />把好作品送上城市舞台。</p></div><img className="offer-hero" src="/media/offer-03.webp" alt="OFFER公益计划深圳地铁展示长廊" />
      <div className="offer-bottom"><div className="offer-images"><img src="/media/offer-01.webp" alt="宠物主题摄影作品地铁展示" /><img src="/media/offer-02.webp" alt="猫咪摄影作品地铁展示" /><img src="/media/offer-04.webp" alt="设计作品地铁展示" /></div><article><span>IDEA</span><h3>重新定义<br />“竞争力”</h3><p>让真实作品成为能力证明，为求职者提供表达和被看见的机会。</p></article><article><span>RESOURCE</span><h3>让传播<br />进入城市</h3><p>推进媒体与城市公共资源合作，把优秀作品带进真实传播场景。</p></article><article><span>DELIVERY</span><h3>从征集<br />走向复制</h3><p>协调作品征集、筛选、展示与传播落地，并推动项目跨城复制。</p></article><div className="offer-metrics"><span>RESULT</span><strong>100+</strong><p>作品投稿</p><strong>15组</strong><p>深圳地铁展示</p><strong>10万+</strong><p>累计互动</p><strong>3城</strong><p>深圳 / 上海 / 北京</p></div></div>
    </section>

    <section className="chapter final" id="current">
      <div className="current-case">
        <div className="current-case-head"><div><span>CURRENT WORK / 04</span><h2>现在，我把品牌方法<br />带进新的产品场景。</h2><p>从合作谈判、机制设计到跨部门交付，让品牌合作进入真实产品体验。</p></div><img src="/media/workbuddy-linkfox-banner.png" alt="LinkFox与WorkBuddy跨境AI搭子联合活动" /></div>
        <div className="current-case-detail">
          <div className="current-story"><article><span>BACKGROUND</span><h3>生态接入后的<br />首个联合运营项目</h3></article><article><span>JUDGEMENT</span><h3>新用户获取与存量用户激活，<br />需要两条不同路径</h3></article><article><span>MY ROLE</span><h3>负责合作谈判，统筹方案、规则、内容、<br />页面与跨部门上线</h3></article></div>
          <div className="current-results"><article><strong>2,069</strong><p>渠道注册</p></article><article><strong>149,743</strong><p>产品调用</p></article><article><strong>+128.3%</strong><p>日均调用</p></article><div><p>两期活动上线，形成从内容触达、注册到调用与活跃的观察链路。</p><small>活动前后工作日观察数据</small></div></div>
        </div>
      </div>
      <div className="closing-career" id="experience"><article><b>NOW / 紫讯科技</b><p>从品牌合作走向生态共建，推动品牌能力进入产品场景。</p></article><article><b>2019—2026 / BOSS直聘</b><p>在快速变化的业务中，建立品牌增长与合作机制。</p></article><article><b>EARLY YEARS / 市场与现场</b><p>从市场执行与现场运营起步，打下用户、内容与增长认知。</p></article></div>
      <div className="closing-about" id="about"><div className="closing-statement"><h2>用技术理解产品，<br />用品牌创造价值。</h2></div><nav><a href="mailto:343906130@qq.com">343906130@qq.com ↗</a><a href="/Vince-resume.pdf" download>下载简历 ↓</a></nav><img src="/media/vince-portrait-cutout.png" alt="黄威Vince职业肖像" /></div>
    </section>
  </main>;
}
