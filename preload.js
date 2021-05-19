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
  }

  var flag = 0, stop = true, cnt = 0, vis = [], pos = [0, 4, 1, 3, 2];

  function nextPhoto() {
    var newPhoto;
    do {
      newPhoto = photoPaths[Math.floor(Math.random()*photoPaths.length)];
    } while (vis.includes(newPhoto));
    var oldPhoto = document.getElementById('photo' + cnt).src;
    if (vis.includes(oldPhoto)) vis.splice(vis.indexOf(oldPhoto, 1));
    vis.push(newPhoto);
    document.getElementById('unit' + cnt).style.display = "block";
    document.getElementById('caption' + cnt).innerHTML = path.basename(newPhoto, path.extname(newPhoto));
    document.getElementById('photo' + cnt).src = newPhoto;
  }

  document.getElementById('button').onclick = function() {
    document.getElementById('file_input').style.display = "none";
    if (stop) {
      stop = false;
      flag = 100;
      setTimeout(function change() {
        nextPhoto();
        if(stop) flag = flag * 1.5;
        if(flag < 700){
          setTimeout(() => {
            change();
          }, flag);
        }
        else{
          setTimeout(() => {
            document.getElementById("unit" + cnt).animate([
              {
                left: "40%",
                top: "8em"
              },{
                left: pos[cnt]*2 + "0%",
                top: "4em"
              }
            ], {
              duration: 2000,
              delay: 1000,
              fill: "forwards",
              easing: "ease",
            })

            setTimeout(() => {
              if(cnt === 0 || cnt === 2 || cnt === 4) nextPhoto();
              ++cnt;
              if(cnt==5){
                document.getElementById("button").style.display = "none";
                for (let i = 0; i < 5; i++) {
                  document.getElementById("unit" + i).animate([
                    {
                      top: "4em"
                    },{
                      top: "8em"
                    }
                  ], {
                    duration: 1000,
                    delay: 3300+pos[i]*300,
                    fill: "forwards",
                    easing: "ease",
                  });
                }
              }
            }, 3000);
          }, 700);
        }
      }, flag);
    }
    else {
      stop = true;
    }
  }
})
