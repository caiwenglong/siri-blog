<template>
  <div class="unit-about-me">
    <template>
      <div class="q-pa-md q-gutter-md">
        <div class="row justify-between">

          <q-parallax
            :src="aboutImg"
            :height="aboutImgHeight"
          >
            <div class="parallax-content">
              <div class="about__name animated slideInLeft">蔡文龙：</div>
              <div class="about__post animated lightSpeedIn">web前端工程师</div>
            </div>
          </q-parallax>

        </div>
      </div>
      <div class="b-related-skill q-pa-md">
        <div class="section-title"><span>相关技能</span></div>
        <q-list dense>
          <div class="row">
            <div class="col">
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section side>
                  <q-icon color="light-green" name="fab fa-html5" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideHTML5"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideHTML5 + '%'"
                    color="light-green"
                  />
                </q-item-section>
              </q-item>
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section side>
                  <q-icon color="amber" name="fab fa-css3-alt" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideCSS3"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideCSS3 + '%'"
                    color="amber"
                  />
                </q-item-section>
              </q-item>
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section avatar>
                  <q-icon color="primary" name="fab fa-js" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideJs"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideJs + '%'"
                    color="primary"
                  />
                </q-item-section>
              </q-item>
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section side>
                  <q-icon color="blue-grey" name="fab fa-java" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideJava"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideJava + '%'"
                    color="blue-grey"
                  />
                </q-item-section>
              </q-item>
            </div>
            <div class="col">
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section avatar>
                  <q-icon color="teal" name="fab fa-vuejs" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideVue"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideVue + '%'"
                    color="teal"
                  />
                </q-item-section>
              </q-item>
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section avatar>
                  <q-icon color="deep-orange" name="fab fa-angular" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideAngular"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideAngular + '%'"
                    color="deep-orange"
                  />
                </q-item-section>
              </q-item>
              <q-item v-scroll-fire="SlideAnimate" class="animated">
                <q-item-section side>
                  <q-icon color="indigo" name="fab fa-node" />
                </q-item-section>
                <q-item-section>
                  <q-slider
                    v-model="slideNode"
                    :min="0"
                    :max="100"
                    label
                    :label-value="slideNode + '%'"
                    color="indigo"
                  />
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </div>
      <div class="b-work-experience q-px-lg q-pa-md">
        <div class="section-title"><span>工作经历</span></div>
        <q-timeline color="secondary" :layout="layoutTimeLine" side="right">

          <q-timeline-entry
            v-scroll-fire="fadeInLeftAnimate"
            title="天用唯勤科技有限公司&软通动力有限公司"
            subtitle="2019.6 - 至今"
            side="left"
          >
            <div>
              该项目是建设银行的人力资源管理系统，
              本人主要负责配合后端完成公司系统的前端开发与维护，
              公司人力资源系统前端页面的开发与维护，
              将后端人员传过来的数据按照业务需求展现给用户。
            </div>
            <div>
              <a href="#">网站链接：内部网站，暂无链接</a>
            </div>
          </q-timeline-entry>

          <q-timeline-entry
            v-scroll-fire="fadeInRightAnimate"
            title="文思海辉技术有限公司"
            subtitle="2017.10 - 2019.6"
            side="right"
          >
            <div>
              该项目是新加坡DBS银行新系统界面，
              本人所负责的是所属模块的开发与测试，
              与后端人员一起完成整个模块流程，
              包括负责后端数据传到前端的展示、样式调试等前端工作。
            </div>
            <div>
              <a href="#">网站链接：内部网站，暂无链接</a>
            </div>
          </q-timeline-entry>
          <q-timeline-entry
            v-scroll-fire="fadeInLeftAnimate"
            title="优芽网络科技有限公司"
            subtitle="2015.6 - 2016.6"
            side="left"
          >
            <div>
              该项目要实现打造全方位、一站式的创意性的课件制作和科学有效的教学管理工具，
              提供便捷的教学互动体验。由于开发人员有限，而且同时进行多个项目的开发，
              于是本人就负责整个互动电影项目前端页面的开发与调试，并且参与公司组件库的编写与维护
            </div>
            <div>
              <a href="https://www.yoya.com/">网站链接：https://www.yoya.com/</a>
            </div>
          </q-timeline-entry>
          <q-timeline-entry
            v-scroll-fire="fadeInRightAnimate"
            title="厦门翼迅科技有限公司"
            subtitle="2014.7 - 2015.6"
            side="right"
          >
            <div>
              该项目要实现打造全方位、一站式的创意性的课件制作和科学有效的教学管理工具，
              提供便捷的教学互动体验。由于开发人员有限，而且同时进行多个项目的开发，
              于是本人就负责整个互动电影项目前端页面的开发与调试，并且参与公司组件库的编写与维护
            </div>
            <div>
              <a href="https://www.yisence.com/SellQ/DiyTemplatePC.aspx">网站链接：https://www.yisence.com/SellQ/DiyTemplatePC.aspx</a>
            </div>
          </q-timeline-entry>

        </q-timeline>
      </div>
    </template>
  </div>
</template>

<script>
import aboutImg from '../../assets/images/about-bg.jpg'
export default {
  name: 'AboutMe',
  data() {
    return {
      slideVue: 70,
      slideAngular: 60,
      slideJs: 75,
      slideNode: 50,
      slideJava: 30,
      slideHTML5: 80,
      slideCSS3: 80,
      aboutImg: aboutImg,
      aboutImgHeight: 680,
      layoutTimeLine: 'loose'
    }
  },

  methods: {
    SlideAnimate(el) {
      el.classList.add('animated')
      el.classList.add('fadeInUp')
      el.style.opacity = 1
    },

    fadeInLeftAnimate(el) {
      el.classList.add('animated')
      el.classList.add('fadeInLeft')
      el.style.opacity = 1
    },

    fadeInRightAnimate(el) {
      el.classList.add('animated')
      el.classList.add('fadeInRight')
      el.style.opacity = 1
    }
  }
}
</script>

<style lang="scss" scoped>
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    line-height: 32px;
    margin-bottom: 32px;
    text-align: center;
    > span  {
      padding-bottom: 8px;
      border-bottom: 2px solid green;
    }
  }
  /* 视差 */
  .parallax-content {
    position: absolute;
    top: 100px;
    left: 180px;
  }
  .about__post {
    font-family: 'Playfair Display', serif;
    font-size: 42px;
  }
  .about__name {
    font-family: 'Lato', sans-serif;
    text-transform: capitalize;
    letter-spacing: 2px;
    position: relative;
    color: #425BB5;
    font-weight: 700;
    font-size: large;
    &:before {
      position: absolute;
      width: 30px;
      left: -40px;
      content: "";
      display: block;
      height: 2px;
      background: #425BB5;
      top: 9px;
    }
  }
</style>
