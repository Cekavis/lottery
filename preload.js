var path = require("path")

window.addEventListener('DOMContentLoaded', () => {
  var photoPaths = [];
  document.getElementById('file_input').onchange = function() {
    var photos = document.getElementById('file_input').files;
    photoPaths = [];
    for (let i = 0; i < photos.length; i++) {
      photoPaths.push(photos[i].path);
    }
    console.log(photoPaths);
    document.getElementById('file_input').style.display = "none";
  }
  var interval = 0, state = true, surprise = 0, cur = 0, used = [], pos = [0, 5, 1, 4, 2, 3];

  var oldPhoto = "";
  
  function nextPhoto() {
    var newPhoto;
    do {
      newPhoto = photoPaths[Math.floor(Math.random()*photoPaths.length)];
    } while (used.includes(newPhoto));
    if (oldPhoto !== "") used.splice(used.indexOf(oldPhoto, 1));
    used.push(newPhoto);
    oldPhoto = newPhoto;
    console.log(used);
    document.getElementById('unit' + cur).style.display = "block";
    document.getElementById('caption' + cur).innerHTML = path.basename(newPhoto, path.extname(newPhoto));
    document.getElementById('photo' + cur).src = newPhoto;
  }
  
  document.onkeydown = function (e) {
    if(e.key === " "){
      if (state) {
        oldPhoto = "";
        state = false;
        interval = 50;
        setTimeout(function change() {
          // console.log(interval);
          nextPhoto();
          if(interval < 200 || surprise > 0){
            if(state){
              if(interval < 200) interval = interval * 2;
              else --surprise;
            }
            setTimeout(() => {
              change();
            }, interval);
          }
          else{
            setTimeout(() => {
              document.getElementById("unit" + cur).animate([
                {
                  left: "41.6666%",
                  top: "8em"
                },{
                  left: pos[cur]*16.6666 + "%",
                  top: "4em"
                }
              ], {
                duration: 2000,
                delay: 400,
                fill: "forwards",
                easing: "ease",
              })
              
              ++cur;
              if(cur === 6){
                for (let i = 0; i < 6; i++) {
                  document.getElementById("unit" + i).animate([
                    {
                      top: "4em"
                    },{
                      top: "8em"
                    }
                  ], {
                    duration: 1000,
                    delay: 2700+pos[i]*300,
                    fill: "forwards",
                    easing: "ease",
                  });
                }
              }
            }, 700);
          }
        }, interval);
      }
      else {
        state = true;
        surprise = Math.floor(Math.random()*3);
      }
    }
  };
})
