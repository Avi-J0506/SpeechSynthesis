// Init Speech Synthesis API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body')

// Init voice array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    

    // Loop through voices and create an option for each one
    voices.forEach(voice =>{
        // Creating an option element
        const option = document.createElement('option');
        // Filling the option with voice and language
        option.textContent = voice.name + '('+ voice.lang +')'

        // Set needed option attributes
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// Speak

const speak = () => {
    // Check if Speaking
    if(synth.speaking){
        console.error("Already speaking...");
        return;
    }
    if(textInput.value !== ""){
        // Add background animation
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value); 

        // Speak end
        speakText.onend = e =>{
            console.log("Done speaking...");
            body.style.background ='#141414';
        }

        // Speak error
        speakText.onend = e =>{
            console.error('Something went wrong');
        }

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice){
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);
    }
}

// EVENT Listeners

// Text form submit
textForm.addEventListener('submit',e =>{
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', e =>rateValue.textContent = text.value)

// Pitch value change
pitch.addEventListener('change', e =>pitchValue.textContent = text.value)

// Voice select change
voiceSelect.addEventListener('change', e => speak());