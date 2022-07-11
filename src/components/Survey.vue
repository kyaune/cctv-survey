<template>
  <div class="survey">
    <div class="survey__container">
      <div class="header__button">
        <div class="survey__close" @click="closeDialog"></div>
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
          <div class="survey__grade-item" v-for="item in 10" @click="setRating(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="survey__wrapper" v-if="currentStep === 4">
        <div class="survey__header">
          <div class="header__text contacts">
            Спасибо за ответы
            <br>
            Вы всегда можете написать нам на почту
            <br>
            <span class="contacts__email">
              vs.info@domru.ru
            </span>
            <br>
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
        <PlateBtn label="позже" @click="closeDialog"></PlateBtn>
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
    const { surveyResults, showDialog } = results()

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
        return
      }
      nextStep()
    }

    const nextStep = () => {
      currentStep.value++;
      if (showComplain.value === true) {
        surveyResults.value[`${currentStep.value}-complain`] = complainMessage.value
        complainMessage.value = ''
        showComplain.value = false
      }
    }

    const closeDialog = () => {
      showDialog.value = false
    }

    return {
      currentStep,
      sendResults,
      setRating,
      surveyResults,
      showComplain,
      nextStep,
      complainMessage,
      closeDialog
    }
  }
}

</script>
<style>

</style>
