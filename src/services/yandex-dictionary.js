const key = 'dict.1.1.20210720T063732Z.855f718017eb2d7c.835972bbd96d31e2d66fa391a0af454b284674fd';

const getTranslateWord = async (text, lang = 'en-ru') => {
    const res = await fetch(`https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${key}&lang=${lang}&text=${text}`)
    const body = await res.json();

    return body.def || [];
}

export default getTranslateWord;