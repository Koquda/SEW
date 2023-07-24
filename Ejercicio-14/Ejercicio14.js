"use strict";

class VideoControls {

    constructor() {


        // We add an event listener to see if the visibility changes
        document.addEventListener("visibilitychange", () => {
            var video = $("video")[0];
            if (document.visibilityState === "hidden") {
                console.log("La ventana no esta visible")
                video.pause();
            }
            else {
                console.log("La ventana esta visible");
                video.play();
            }


        });

    }

    startDragAndDrop() {
        var sections = $("section").toArray();
        for (let element of sections) {
            element.addEventListener('dragstart', this.handleDragStart);
            element.addEventListener('dragend', this.handleDragEnd);
        }

    }

    handleDragStart(e) {
        this.style.opacity = '0.4';
    }

    handleDragEnd(e) {
        this.remove();
    }


    toggleFullScreen() {
        var element = $("video")[0];
        if (document.webkitFullscreenElement) {
            document.webkitCancelFullScreen();
        } else {
            element.webkitRequestFullScreen();
        }
    }

}

var video = new VideoControls();
