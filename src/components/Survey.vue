<template>
  <div class="survey">
    <div class="survey__container">
      <div class="header__button">
        <div class="survey__close"></div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 0">
      <div class="survey__text">
        <p>
          Привет! Рады, что Вы подключили Видеонаблюдение Дом.ру Бизнес.
        </p>
        <p>
        Нам важно, как прошло подключение и все ли в порядке с услугой.
        </p>
        <p>
        Пройдите, пожалуйста, краткий опрос
        </p>
      </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 1 && !showComplain">
        <div class="survey__header">
          <div class="header__icon">
            <img src="/src/assets/electricity.svg">
          </div>
          <div class="header__text">
          Оцените, как прошло подключение услуги видеонаблюдение
          </div>
        </div>
        <div class="survey__emojis">
          <img
              v-for="smile in 5"
              :src="`../src/assets/emojis/emoji${smile}.svg`"
              @click="setRating(smile)"
          />
        </div>
        <div class="survey__estimate">
          <div style="color: #C51F1F">Очень плохо</div>
          <div style="color: #15A250">Отлично</div>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 2 && !showComplain">
        <div class="survey__header">
          <div class="header__icon">
            <img src="/src/assets/cctv.svg">
          </div>
          <div class="header__text">
            Насколько видеонаблюдение решает Ваши задачи?
          </div>
        </div>
        <div class="survey__emojis">
          <img
              v-for="smile in 5"
              :src="`../src/assets/emojis/emoji${smile}.svg`"
              @click="setRating(smile)"
          />
        </div>
        <div class="survey__estimate">
          <div style="color: #C51F1F; text-align: start">Совсем не решает</div>
          <div style="color: #15A250; text-align: end">Полностью решает</div>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 3 && !showComplain">
        <div class="survey__header">
          <div class="header__text">
            Порекомендуете ли Вы Видеонаблюдение Дом.ру Бизнес коллегам или партнерам?
          </div>
        </div>
        <div class="survey__grade">
          <div class="survey__grade-item" v-for="item in 10" @click="sendResults(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 4">
        <div class="survey__header">
          <div class="header__text">
            Спасибо за ответы
            Вы всегда можете написать нам на почту
            vs.info@domru.ru
            Мы на связи!
          </div>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 1 && showComplain">
        <div class="survey__header">
          <div class="header__text">
            Расскажите подробнее,с какими проблемами при подключении Вы столкнулись?
          </div>
        </div>
        <div class="survey__textarea">
          <textarea v-model="complainMessage" placeholder="Опишите проблемы"></textarea>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 2 && showComplain">
        <div class="survey__header">
          <div class="header__text">
            Расскажите подробнее о том, почему Вы не смогли решить Ваши задачи?
          </div>
        </div>
        <div class="survey__textarea">
          <textarea v-model="complainMessage" placeholder="Опишите проблемы"></textarea>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 3 && showComplain">
        <div class="survey__header">
          <div class="header__text">
            Расскажите подробнее, почему Вы не стали бы нас рекомендовать?
          </div>
        </div>
        <div class="survey__textarea">
          <textarea v-model="complainMessage" placeholder="Опишите проблемы"></textarea>
        </div>
      </div>
      <div class="footer__buttons" v-if="currentStep === 0">
        <PlateBtn colored label="Пройти сейчас" @click="nextStep"></PlateBtn>
        <PlateBtn label="позже"></PlateBtn>
      </div>
      <div class="footer__buttons" v-if="currentStep === 1 || currentStep === 2 || currentStep === 3">
        <PlateBtn colored label="Далее" @click="nextStep"></PlateBtn>
      </div>
      <div class="footer__buttons" v-if="currentStep === 4">
        <PlateBtn colored label="Ок" @click="sendResults"></PlateBtn>
      </div>
    </div>
  </div>
</template>
<script>
import PlateBtn from "./buttons/PlateBtn.vue";
import results from './results.js'
import { ref } from 'vue'
export default {
  components: { PlateBtn },
  setup() {
    const { surveyResults } = results()

    const currentStep = ref(0)
    const showComplain = ref(false)
    const complainMessage = ref('')

    const sendResults = () => {
      console.log('send')
    }

    const setRating = (index) => {
      surveyResults.value[`${currentStep.value}`] = index
      if (index < 4) {
        showComplain.value = true
      }
    }

    const nextStep = () => {
      currentStep.value++;
      if (showComplain.value === true) {
        surveyResults.value[`${currentStep.value}-complain`] = complainMessage.value
        complainMessage.value = ''
        showComplain.value = false
      }
    }
    return {
      currentStep,
      sendResults,
      setRating,
      surveyResults,
      showComplain,
      nextStep,
      complainMessage
    }
  }
}

</script>
<style>

.survey {
  height: 440px;
  width: 360px;
  background-image: url("../assets/opros_bg1.svg");
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.survey__container {
  height: 388px;
  width: 320px;
  border-radius: 20px;
  background: white;
  padding: 18px;
  display: flex;
  flex-direction: column;
}

.header__button {
  display: flex;
  flex-direction: row;
  justify-content: end;
}

.survey__text {
  font-weight: 700;
  /*display: flex;*/
}

.footer__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: auto;
}

.survey__close {
  width: 12px;
  height: 12px;
  background-image: url("../assets/close.svg");
}

.survey__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.survey__header {
  display: flex;
  flex-direction: row;
  padding: 4px;
}

.header__icon {
  width: 30px;
  height: 30px;
  padding-right: 20px;

}

.header__text {
  font-weight: 700;
  font-size: 21px;
  line-height: 25px;
}

.survey__emojis {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 30px 0;
}

.survey__estimate {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.survey__textarea {
  padding-top: 18px;
}

.survey__grade {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /*column-gap: 3px;*/
  padding-top: 30px;
  max-width: 320px;
}

.survey__grade-item {
  height: 80px;
  width: 26px;
  background-color: #6BC379;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  line-height: 24px;
}

.survey__grade-item:nth-of-type(1) {
  border-radius: 32px 0 0 32px;
}

.survey__grade-item:nth-of-type(10) {
  border-radius: 0 32px 32px 0;
}

.survey__grade-item:nth-of-type(-n+3) {
  background-color: #EF7A7A;
}

.survey__grade-item:nth-of-type(n + 3):nth-of-type(-n + 4) {
  background-color: #F4AD6B;
}

.survey__grade-item:nth-of-type(n + 5):nth-of-type(-n + 6) {
  background-color: #F4DC61;
}

.survey__grade-item:nth-of-type(n + 7):nth-of-type(-n + 8) {
  background-color: #B0C78C;
}

textarea {
  min-width: 320px;
  min-height: 160px;
  border: 1px solid #CFDBE0;
  border-radius: 10px;
}
</style>
