const key = process.env.REACT_APP_YANDEX_API_KEY;
const getTranslateWord = async (text, lang = 'en-ru') => {
    const res = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`)
    const body = await res.json();

    return body.def || [];
}

export default getTranslateWord;