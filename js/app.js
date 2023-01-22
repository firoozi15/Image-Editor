const choose_image = document.querySelector("#btn-choose");
const choose_imageH = document.querySelector("#btn-chooseh");
const previewimage= document.querySelector(".preview img");
const preview= document.querySelector(".preview");
const preview_loading= document.querySelector(".preview-loading");
const controls= document.querySelector(".controls");
const controlsbtn= document.querySelectorAll(".btn-filter");
const range_slider= document.querySelector(".bar-filters");
const range_value= document.querySelector(".head-value");
const rotate_image= document.querySelectorAll(".btn-rotate");
const resetfilter= document.querySelector("#btn-reset");
const downloadbtn= document.querySelector("#btn-download");

let brightness = 100 , saturation = 100 , grayscale = 0 , inversation = 0;
let rotate = 0 , flipV = 1 , flipH = 1;
const applyFilters = () =>{
    previewimage.style.transform = `rotate(${rotate}deg) scale(${flipV},${flipH})`;
    previewimage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversation}%)`;
}

const loadimage = () => {
    let file = choose_imageH.files[0];
    if(!file)return;
    preview_loading.style.display = "none";
    previewimage.style.display = "flex"; 
    previewimage.src = URL.createObjectURL(file);
    preview.style.maskImage = `url(${file})`;
    controls.classList.remove("desable");
    resetfilters();
}

// adding event click for control buttons
controlsbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".btn-filter-s").classList.remove("btn-filter-s");
        btn.classList.add("btn-filter-s");
        console.log(btn);
        document.querySelector(".head-range").innerText = btn.innerText;
        
        if(btn.id === "brightness"){
            range_value.innerText = `${brightness.toString()}%`;
            range_slider.value = brightness;
            range_slider.max = 200;
        }
        else if(btn.id === "saturation"){
            range_value.innerText = `${saturation.toString()}%`;
            range_slider.value = saturation;
            range_slider.max = 200;
        }
        else if(btn.id === "grayscale"){
            range_value.innerText = `${grayscale.toString()}%`;
            range_slider.value = grayscale;
            range_slider.max = 100;
        }
        else if(btn.id === "inversation"){
            range_value.innerText = `${inversation.toString()}%`;
            range_slider.value = inversation;
            range_slider.max = 100;
        }

    });
});

// update range values
const rangeUpdate = () => {
    console.log(range_slider.value);
    range_value.innerText = `${range_slider.value}%`;
    const selectedbtn = document.querySelector(".btn-filter-s");

    if (selectedbtn.id === "brightness") {
        brightness = range_slider.value;
    }
    else if (selectedbtn.id === "saturation") {
        saturation = range_slider.value;
    }
    else if (selectedbtn.id === "grayscale") {
        grayscale = range_slider.value;
    }
    else if (selectedbtn.id === "inversation") {
        inversation = range_slider.value;
    }

    applyFilters();
}

rotate_image.forEach(btn => {
    btn.addEventListener("click",() => {
        if (btn.id === "RL") {
            rotate -= 90;
        }
        else if (btn.id === "RR") {
            rotate += 90;
        }
        else if (btn.id === "FV") {
            flipV = flipV === 1 ? -1 : 1 ;
        }
        else if (btn.id === "FH") {
            flipH = flipH === 1 ? -1 : 1 ;
        }
        applyFilters();
    })
});

const resetfilters = () => {
    brightness = 100;
    saturation = 100;
    inversation = 0;
    grayscale = 0 ;
    rotate = 0;
    flipH = 1;
    flipV = 1 ;
    range_value.innerText = "100%";
    range_slider.value = 50;
    applyFilters();
}

const downloadimage = () => {
    console.log("downloaded");
    const canavas_dl = document.createElement("canvas");
    const ctx = canavas_dl.getContext("2d");
    canavas_dl.width = previewimage.naturalWidth;
    canavas_dl.height = previewimage.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) grayscale(${grayscale}%) invert(${inversation}%)`;
    ctx.translate(canavas_dl.width / 2,canavas_dl.height / 2);
    ctx.scale(flipV,flipH);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.drawImage(previewimage,-canavas_dl.width / 2,-canavas_dl.height / 2,canavas_dl.width,canavas_dl.height);

    const link = document.createElement("a");
    link.download = "image.jpeg";
    link.href = canavas_dl.toDataURL();
    link.click();
}

downloadbtn.addEventListener("click",downloadimage)
preview_loading.addEventListener("click",() => choose_imageH.click());
resetfilter.addEventListener("click",resetfilters);
range_slider.addEventListener("input",rangeUpdate);
choose_imageH.addEventListener("change",loadimage);
choose_image.addEventListener("click", () => choose_imageH.click());