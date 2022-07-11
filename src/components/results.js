import { ref } from 'vue'

const surveyResults = ref({})
const showDialog = ref(true)

export default function () {

    return {
        surveyResults,
        showDialog
    }
}
