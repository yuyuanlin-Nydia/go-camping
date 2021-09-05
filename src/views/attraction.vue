<template>
  <Banner-top>
    <template v-slot:title>周邊景點</template>
  </Banner-top>
  <div class="content main">
    <h2>一起來南投吧!</h2>
    <div class="attractions">
      <section @click="showDetails(1)">
        <img src="../assets/img/attraction/sunMoonLake.jpg" alt="" />
        <div>
          <img
            style="width: 15%"
            src="../assets/img/attraction/symbol.png"
            alt=""
          />
          <p class="number">1</p>
          <h4 class="location">日月潭</h4>
          <h6>開車約15分鐘</h6>
        </div>
      </section>
      <section @click="showDetails(2)">
        <img src="../assets/img/attraction/chichi.jpg" alt="" />
        <div>
          <img
            style="width: 15%"
            src="../assets/img/attraction/symbol.png"
            alt=""
          />
          <p class="number">2</p>
          <h4 class="location">集集火車站</h4>
          <span>開車約40分鐘</span>
        </div>
      </section>
      <section @click="showDetails(3)">
        <img src="../assets/img/attraction/nineRaces.jpg" alt="" />
        <div>
          <img
            style="width: 15%"
            src="../assets/img/attraction/symbol.png"
            alt=""
          />
          <p class="number">3</p>
          <h4 class="location">九族文化村</h4>
          <span>開車約20分鐘</span>
        </div>
      </section>
      <section @click="showDetails(4)">
        <img src="../assets/img/attraction/Liyutan.jpg" alt="" />
        <div>
          <img
            style="width: 15%"
            src="../assets/img/attraction/symbol.png"
            alt=""
          />
          <p class="number">4</p>
          <h4 class="location">鯉魚潭</h4>
          <span>開車約20分鐘</span>
        </div>
      </section>
      <section @click="showDetails(5)">
        <img src="../assets/img/attraction/Zhushan.jpg" alt="" />
        <div>
          <img
            style="width: 15%"
            src="../assets/img/attraction/symbol.png"
            alt=""
          />
          <p class="number">5</p>
          <h4 class="location">孟宗竹蔭隧道</h4>
          <span>開車約1小時</span>
        </div>
      </section>
    </div>
    <span
      class="close_btn"
      @click="showModule = !showModule"
      v-if="showModule == true"
      >×</span
    >
    <div class="details">
      <transition>
        <div class="info" v-if="infoNum == 1 && showModule == true">
          <img src="../assets/img/attraction/sunMoonLake.jpg" alt="" />
          <div>
            <h3>日月潭</h3>
            <p>
              <span style="font-size: 14px">開車約15分鐘</span> <br />
              日月潭位於南投縣魚池鄉，是全台最大與最美麗的高山淡水湖泊，潭景霧薄如紗，四周群巒疊翠，海拔高748公尺，面積116平方公里，全潭以拉魯島(光華島)為界，南形如月弧，北形如日輪，因而得名為「日月潭」。舊稱水沙連的日月潭在觀光局設立日月潭國家風景區之後，範圍涵蓋日月潭、埔里、集集、頭社、信義、大雁、埔里等遊憩區域，擁有高山湖泊、自然生態及人文景觀等各種特色，潭區還有著名的拉魯島、文武廟、慈恩塔、玄奘寺、梅荷園、耶穌堂等景點，吸引中外遊客相繼造訪。<br />
              詩情畫意的日月潭，兼具人文與景觀之美，是國內外頗具盛名的景點，在日月潭共有水社碼頭、德化社碼頭、朝霧碼頭、玄光寺碼頭等四個公共碼頭，遊日月潭可選擇搭乘遊艇、健行、騎自行車等方式暢遊，乘遊艇遊湖一圈大約不到1小時，而環湖公路全長約33公里，騎乘自行車再搭配沿途各個景點作為親子休閒一日遊，不但可以健身，又可悠閒的瀏覽體會日月潭好山好水與美麗風景，是感受日月潭風情的另一個方法。來日月潭旅遊，別忘了順道品嚐美味的總統魚、小米粥等原住民風味餐，或搭乘日月潭纜車旅遊九族文化村，都可以感受日月潭週遭的旅遊風光。
            </p>
          </div>
        </div>
      </transition>
      <transition>
        <div class="info" v-if="infoNum == 2 && showModule == true">
          <img src="../assets/img/attraction/chichi.jpg" alt="" />
          <div>
            <h3>集集火車站</h3>
            <p>
              <span style="font-size: 14px">開車約40分鐘</span> <br />
              集集火車站建於西元1930年，是一座以檜木建造的古老車站，可說是集集鎮的地標，也是鐵路集集支線上最知名的站點；曾因921地震損毀，完成重建後的火車站，仍保有日式木造外觀，是目前碩果僅存日治時代留下的火車站。<br /><br />

              早期的集集支線主要是運載建造發電廠的工程材料，後來隨著地方繁榮，集集支線開始兼負起沿線旅客及農產、木材等物資的傳輸功能，更是見證鐵路支線經濟價值的活古蹟，在懷舊鐵道中特色十足！<br /><br />

              1994年，在鐵路局與鎮公所的合力推展下，集集支線的小火車轉型為觀光彩繪列車，假日時遊客絡繹不絕，讓集集重現早年的風光。來到集集火車站除了體驗鐵道文化與飽覽沿途秀麗的景緻，更能感受當地居民「打斷手骨顛倒勇（台語）」的韌性。<br /><br />

              車站斜對面有一部已除役的蒸汽火車頭，為集集支線小火車的風光歷史做見證；遊客喜歡在此拍照，作為「到此一遊」的紀念。<br /><br />
            </p>
          </div>
        </div>
      </transition>
      <transition>
        <div class="info" v-if="infoNum == 3 && showModule == true">
          <img src="../assets/img/attraction/nineRaces.jpg" alt="" />
          <div>
            <h3>九族文化村</h3>
            <p>
              <span style="font-size: 14px">開車約20分鐘</span> <br />
              九族文化村以日月潭纜車與日月潭緊緊相連，園區原住民文化、歐洲花園、頂尖的遊樂設施聞名台灣，最熱門的設施包括：西班牙海岸、「加勒比海探險」水上雲霄飛車、自由落體UFO、懸吊式雲霄飛車「馬雅探險」、金礦山、太空山VR等遊樂設施，而娜魯灣劇場「原住民歌舞表演」、九族廣場「祭典會所」的祭典演出，更是遊客絕不能錯過的演出。<br /><br />
              <span style="font-weight: 800">水陸空旅遊經典玩法</span> <br />
              來到九族文化村，不可錯過的便是搭纜車俯瞰日月潭，其中纜車可分一般纜車和水晶纜車，想要從腳下一覽居高臨下的風景，請務必搭乘水晶纜車享受刺激的視覺饗宴。不論是搭空中纜車、到日月潭遊湖或是在九族文化村大玩特玩，都是水陸空旅遊的經典玩法，多樣化的旅遊形式都能滿足各年齡層的需求。
            </p>
          </div>
        </div>
      </transition>
      <transition>
        <div class="info" v-if="infoNum == 4 && showModule == true">
          <img src="../assets/img/attraction/Liyutan.jpg" alt="" />
          <div>
            <h3>鯉魚潭</h3>
            <p>
              <span style="font-size: 14px">開車約20分鐘</span> <br />
              埔里鯉魚潭被喻為埔里中心碑的後花園，位於埔里鎮東郊，面積約20公頃，周圍依山傍水，有著「小西湖」美稱。鯉魚潭有七大吉穴：鯉魚穴、龜穴、鷹穴、龍穴、蝙蝠穴、蝦穴、蜈蚣穴，不同穴位有不同的地貌與故事，隱藏在鯉魚潭美麗的湖光山色下，還有樟公、柳堤傳奇等充滿靈氣的風水故事更讓此地增添了神秘的色彩。<br /><br />
              環潭一周可觀賞鯉魚潭的七大吉穴，潭邊有許多植物、動物生態資源十分豐富，放慢腳步細細觀察，就能感受自然生態之美。環潭步行一圈大概需花費45分鐘，若是不想走也可以選擇花費100元搭乘遊園小火車，就能乘坐在小火車上吹著風觀賞整個鯉魚潭的景色。
            </p>
          </div>
        </div>
      </transition>
      <transition>
        <div class="info" v-if="infoNum == 5 && showModule == true">
          <img src="../assets/img/attraction/Zhushan.jpg" alt="" />
          <div>
            <h3>孟宗竹蔭隧道</h3>
            <p>
              <span style="font-size: 14px">開車約1小時</span> <br />
              詩情畫意的孟宗竹海步道，濃密竹林籠罩在這綠色隧道，整個竹山的竹子彷彿在這群居，少有車輛行經的竹蔭隧道很適合搭配著天梯or八卦茶園順道一遊，即便僅是步行100多公尺，也是涼風陣陣綠意盎然，此孟宗竹蔭隧道約在投49縣道的15k處喔！ <br><br>
              這條竹蔭林道景色優美、人跡罕至，如果需要取景或是悠閒的享受山林時光，這裡是條十分值得推薦的景點，有機會來到天梯的話，可以順道來此一遊!
            </p>
          </div>
        </div>
      </transition>
    </div>
  </div>
  <br /><br /><br /><br /><br /><br />
</template>

<script>
import BannerTop from "../components/bannerTop.vue";
export default {
  components: {
    BannerTop,
  },
  data() {
    return {
      infoNum: 1,
      showModule: true,
    };
  },
  methods: {
    showDetails(num) {
      this.infoNum = num;
      this.showModule = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.content {
  width: 70%;
  margin: 0 auto;
  border: 40px solid rgba(224, 145, 80, 0.5);
  margin-top: 50px;
  padding: 40px 30px;
  box-sizing: content-box;
  h2{
    font-weight: bold;
  }
  .attractions {
    padding-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    section {
      flex: 1;
      text-align: center;
      position: relative;
      cursor: pointer;
      &:hover {
        > img {
          opacity: 0.6;
        }
      }
      div {
        position: absolute;
        top: 80%;
        width: 100%;
        .number {
          color: white;
          position: absolute;
          top: 5%;
          left: 50%;
          transform: translate(-50%, 0);
          font-size: 20px;
        }
        .location {
          color: $color1;
        }
      }
      img {
        width: 100%;
      }
    }
  }
}
.info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  img {
    width: 400px;
    height: 300px;
    display: block;
    object-fit: cover;
  }
}
.close_btn {
  font-size: 80px;
  font-weight: bold;
  margin-left: auto;
  margin-top: 70px;
  cursor: pointer;
  line-height: 0.8;

  &:hover {
    color: $color2;
  }
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 3s;
}
.v-enter-to {
  opacity: 1;
}
</style>