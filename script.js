const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("#transfer");
const fromText = document.querySelector("#fromtext");
const toText = document.querySelector("#totext");
const icons = document.querySelectorAll("img");


selectTag.forEach((tag , id) => {
    
    for (const countriesCode in countries) {  //for in object ke ander ke sare key ko access karta hai
        let selected ;
        // if(id == 0 && countriesCode == "en-GB"){
        //     selected = "selected";
        // }
        // else if(id == 1 && countriesCode == "hi-IN"){
        //     selected = "selected"
        // }
        let option = `<option value="${countriesCode}">${countries[countriesCode]}</option>`;
         tag.insertAdjacentHTML("beforeend", option);
    }
});

//insertAdjacentHTML() kya karta hai?
//👉 Yeh ek method hai jo kisi existing element ke andar ya uske aas paas naye HTML elements insert karne ke liye use hoti hai.

translateBtn.addEventListener("click",() => {
    let Text = fromText.value ;
    let translateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    const apiURL =` https://api.mymemory.translated.net/get?q=${encodeURIComponent(Text)}&langpair=${translateFrom}|${translateTo}`;
    
    fetch(apiURL).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;  //mymemory api used
    });

});

icons.forEach((icon) => {
    icon.addEventListener("click", ({target}) => {
        if(target.classList.contains("copy")){
            // console.log("copy")
            if(target.id == "from"){
            navigator.clipboard.writeText(fromText.value)
            }
            else{
            navigator.clipboard.writeText(toText.value)

            }
        }
        else{
           let utterance; 
           if(target.id == "from"){
            utterance = new SpeechSynthesisUtterance(fromText.value);
            utterance.lang = selectTag[0].value;

           }
           else{
            utterance = new SpeechSynthesisUtterance(toText.value);
            utterance.lang = selectTag[1].value;
           }
           speechSynthesis.speak(utterance);


        }
    });
});


const voices = speechSynthesis.getVoices();
console.log(voices); // Logs all available voices in the console



