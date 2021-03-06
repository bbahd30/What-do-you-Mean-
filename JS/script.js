const input = document.querySelector(".searchedWord");
const meaning = document.querySelector(".meaning span");
const info = document.querySelector(".info");
const example = document.querySelector(".example span");
const syno = document.querySelector(".syno span");
const pronunciation = document.querySelector("#pronunciation");

const container1 = document.querySelector(".container1");

function f (data, word)
{
    if (data.title)
    {
        var notPresent = document.createElement("div");
        notPresent.classList.add("error");
        notPresent.setAttribute("id","noMatch");
        notPresent.innerText = `Can't find the meaning of ${input.value}. Try searching another word.`;
        container1.appendChild(notPresent);
        document.querySelector(".container2").setAttribute("invisible","true");
    }
    else
    {
        
        document.querySelector(".container2").removeAttribute("invisible");
        console.log(data);

        meaning.innerText = data[0].meanings[0].definitions[0].definition;
        document.querySelector(".info p").innerText = data[0].word;
        if ( data[0].meanings[0].partOfSpeech==undefined)
        {
            info.querySelector(".type").style.display = "none";
        }
        else
        {
            info.querySelector(".type").innerText = `${data[0].meanings[0].partOfSpeech}`;
        }
        if ( data[0].phonetics[0].text==undefined)
        {
            info.querySelector(".pronun").style.display = "none";
        }
        else
        {
            info.querySelector(".pronun").innerText = `${data[0].phonetics[0].text}`;;
        }
        // example.innerText = data[0].meanings[0].definitions[0].example;
        // syno.innerText = data[0].meanings[0].definitions[0].example;
        
        for (let j=0; j<3; j++)
        {
            if (data[0].meanings[0].synonyms[j]== undefined)
            {
                syno.parentElement.style.display = "none";
            }
            else
            {
                if (j!==2)
                {
                    var syn = `${data[0].meanings[0].synonyms[j]}, \u2009`;
                }
                else
                {
                    var syn = `${data[0].meanings[0].synonyms[j]}, etc`;
                }
                syno.innerText+= syn;
            }
        }
       
        pronounce = () =>
        {
            const audio = new Audio();
            audio.src = data[0].phonetics[0].audio;
            audio.play();
        }
        pronunciation.addEventListener("click", pronounce);

        // if (data[0].meanings[0].definitions.length<= 3)
        // {
        //     for (let j=1; j<=(data[0].meanings[0].definitions.length)-1; j++)
        //     {
        //         var adder = document.createElement("span");
        //         console.log(data[0].meanings[0].definitions[j].definition);
        //         adder.innerText = data[0].meanings[0].definitions[j].definition;
        //         document.querySelector(".meaning").appendChild(adder);
        //     }
        // }
    }
}
meaningGiver = (word) =>
{
    var apiurl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(apiurl)
    .then(response => response.json()).then(data => f(data, word));
}
input.addEventListener("keyup", (event) => 
{
    if (event.key==="Enter" && input.value !=="")
    {
        meaningGiver(input.value);
    }
});

