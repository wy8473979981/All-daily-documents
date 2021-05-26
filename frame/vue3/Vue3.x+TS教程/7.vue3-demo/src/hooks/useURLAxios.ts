import { ref } from 'vue'
import axios from 'axios'

function useUrlAxios(url: string) {
    const result = ref(null)
    const loading = ref(true)
    const loaded = ref(false)
    const error = ref(null)

    axios.get(url).then((res) => {
        loading.value = false
        loaded.value = true
        result.value = res.data.data
    }).catch(e => {

        error.value = e
        loading.value = false
    })
    return {
        result,
        loading,
        loaded,
        error
    }
}

export default useUrlAxios