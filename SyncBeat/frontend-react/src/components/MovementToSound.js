const lastPlayedTimestamps = {}; 
const cooldown = 3500;
const activeSounds = [];
var lastHandPosition = { x: 0, y: 0 };
var alreadyPlayed = false;
var bigCooldown = false;
const pack = 1; // 0 - Default pack, 1 - RnB pack, 2 - Beatrice pack

export function playSound(soundFile) {
    const now = Date.now();

    if (lastPlayedTimestamps[soundFile] && now - lastPlayedTimestamps[soundFile] < cooldown) {
      return;
    }
    
    lastPlayedTimestamps[soundFile] = now;
    const audio = new Audio(soundFile);
    activeSounds.push(audio);
    audio.play();
    alreadyPlayed = true;
    audio.addEventListener('ended', () => {
      const index = activeSounds.indexOf(audio);
      if (index !== -1) activeSounds.splice(index, 1);
    });
  }
  
  export function processHandMovement(handLandmark) {
    alreadyPlayed = false;
    if (!handLandmark) return;

    const canvas = document.getElementById('trailCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    
    var wrist = handLandmark[0];
    var thumb = handLandmark[4];
    var indexFinger = handLandmark[8];
    var middleFinger = handLandmark[12];
    var ringFinger = handLandmark[16];
    var pinkyFinger = handLandmark[20];
    var mainFingers = [indexFinger, middleFinger, ringFinger, pinkyFinger];
    var isIndexPointingList = [middleFinger, ringFinger, pinkyFinger];
    const handPosition = { x: wrist.x, y: wrist.y };
    var isIndexPointing = true;
    var shouldStop = true;

    const x = canvas.width - indexFinger.x * canvas.width;
    const y = indexFinger.y * canvas.height;
    
    for (var finger of isIndexPointingList) {
      const distance = absoluteDistance(wrist, finger);
      if (distance > 0.3) { // Se a distancia for grande o dedo n esta a apontar e a musica nao vai parar
        // console.log("Segue");
        console.log("Mao aberta");
        isIndexPointing = false;
        shouldStop = false;
      }
    }
    var indexNode = handLandmark[6];
    // console.log(absoluteDistance(indexFinger, wrist) < absoluteDistance(indexNode, wrist));
    if (isIndexPointing) {
      if (absoluteDistance(indexFinger, wrist) < absoluteDistance(indexNode, wrist)) {
        console.log("Mao fechada");
        isIndexPointing = false;
        shouldStop = shouldStop && true;
      }
      else {
        shouldStop = false;
        console.log("Apontar o dedo");
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Cor branca com opacidade
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2); // Círculo com raio 10
        ctx.fill();
      }
    }
    ctx.fillStyle = 'rgba(0, 0, 0, 0.04)'; // Fundo preto com baixa opacidade
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("Should stop: " + shouldStop);
    if (shouldStop) {
      for (var audio of activeSounds) {
        audio.pause();
        audio.currentTime = 0;
      }
      activeSounds.length = 0;
      return;
    }
    console.log(absoluteDistance(lastHandPosition, wrist));
    if (isIndexPointing && absoluteDistance(lastHandPosition, wrist) > 0.03) {
      console.log("fast movement while poiting");
      bigCooldown = true;
      if (lastHandPosition.y > wrist.y) { // Movimento para cima
        switch (pack) {
          case 0: // Default pack
            playSound('/assets/music/pianoRunHandmovement.mp3');
            break;
          case 1: // RnB pack
            playSound('/assets/music/rnb/fluteIntro.mp3');
            break;
          case 2: // Beatrice pack
            playSound('/assets/music/beatrice/voz.mp3');
            break;
          default:
            break;
        }

      }
      else{ // Movimento para baixo
        // switch (pack) {
        //   case 0: // Default pack
        //     playSound('/assets/music/bateria.mp3');   
        //     break;
        //   case 1: // RnB pack
        //     playSound('/assets/music/rnb/justBassIntro.mp3');
        //     break;
        //   case 2: // Beatrice pack
        //     playSound('/assets/music/beatrice/voz.mp3');
        //     break;
        //   default:
        //     break;
        // }
      }
    }
    
    if (!alreadyPlayed && !isIndexPointing) {
      if (wrist.x < 0.33) { // Lado direito
        switch (pack) {
          case 0: // Default pack
            playSound('/assets/music/NewIdeaMelancolicDance.mp3');
            break;
          case 1: // RnB pack
            playSound('/assets/music/rnb/guitarIntro.mp3');
            break;
          case 2: // Beatrice pack
            playSound('/assets/music/beatrice/precurssao.mp3');
            break;
          default:
            break;
        }
      } else if (wrist.x >= 0.33 && wrist.x < 0.66) { // Meio do ecra
        switch (pack) {
          case 0: // Default pack
            playSound('/assets/music/jazzyPianoWDrumsNBassQuiet.mp3'); 
            break;
          case 1: // RnB pack
            playSound('/assets/music/rnb/musicaCompleta.mp3');
            break;
          case 2: // Beatrice pack
            playSound('/assets/music/beatrice/bassMidChorus.mp3');
            break;
          default:
            break;
        }
      } else { // Lado esquerdo
        switch (pack) {
          case 0: // Default pack
            playSound('/assets/music/pianoWithStringsDance.mp3');
            break;
          case 1: // RnB pack
            playSound('/assets/music/rnb/justBassIntro.mp3');
            break;
          case 2: // Beatrice pack
            playSound('/assets/music/beatrice/piano2ndChorus.mp3');
            break;
          default:
            break;
        }
      }
    }
    lastHandPosition = wrist;
  }
  
  function absoluteDistance(p1, p2) {
    return Math.sqrt(
      Math.pow(p1.x - p2.x, 2) +
      Math.pow(p1.y - p2.y, 2) +
      Math.pow(p1.z - p2.z, 2)
    );
  }
  