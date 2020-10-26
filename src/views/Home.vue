<template>
  <div class="home">
    <audio
      @loadedmetadata="getSource"
      @timeupdate="getCur"
      ref="audio"
      controls
      src="@/assets/music/1.mp3"
    ></audio>
    <van-slider
      @drag-start="start"
      @drag-end="end"
      @input="onChange"
      v-model="progress"
      active-color="#ee0a24"
    >
      <template #button>
        <div class="custom-button">{{ current }}/{{ total }}</div>
      </template>
    </van-slider>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      current: '00:00',
      current1: 0,
      total: 0,
      total1: 0,
      progress: 0,
    };
  },
  methods: {
    //实时获取歌曲播放进度时间
    getCur(e) {
      this.current1 = e.target.currentTime;
      this.current = this.formatSeconds(e.target.currentTime);
      this.progress = Math.floor((this.current1 / this.total1) * 100);
      // console.log(e.target.currentTime);
      // console.log(this.progress);
    },
    //歌曲资源加载完成后触发，获取歌曲总时长
    getSource() {
      this.total1 = this.$refs.audio.duration;
      this.total = this.formatSeconds(this.$refs.audio.duration);
    },
    //滑块开始滑动触发
    start() {
      this.$refs.audio.pause();
    },
    //滑块结束滑动触发
    end() {
      this.$refs.audio.play();
    },
    //滑块滑动过程触发
    onChange(value) {
      let position = (value * this.total1) / 100;
      this.$refs.audio.currentTime = position;
    },
    //格式化歌曲时间
    formatSeconds(value) {
      let secondTime = parseInt(value); // 秒
      let minuteTime = 0; // 分
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      let result =
        "" +
        (parseInt(secondTime) < 10
          ? "0" + parseInt(secondTime)
          : parseInt(secondTime));
      result =
        "" +
        (parseInt(minuteTime) < 10
          ? "0" + parseInt(minuteTime)
          : parseInt(minuteTime)) +
        ":" +
        result;
      return result;
    },
  },
};
</script>

<style>
.van-slider {
  box-sizing: border-box;
  padding: 0 82px 0 10px;
  /* padding-right: 72px; */
  margin-top: 20px;
}
.custom-button {
  width: 72px;
  color: #fff;
  font-size: 10px;
  line-height: 18px;
  text-align: center;
  margin-left: 75px;
  background-color: #ee0a24;
  border-radius: 100px;
}
</style>