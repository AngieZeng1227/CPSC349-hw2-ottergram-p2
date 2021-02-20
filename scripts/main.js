var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var LEFT_BUTTON_SELECTOR = '[data-image-role="left-button"]';
var RIGHT_BUTTON_SELECTOR = '[data-image-role="right-button"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var position = 0;

function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;

}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}


function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);

        showDetails();
    });
}

function addLeftButtonClickHandler(thumbnails) {
    'use strict';
    document.getElementById('left-button').addEventListener('click', function (event) {
        event.preventDefault();
        getCurrentPosition(thumbnails);
        cycleLeft(thumbnails);
        setDetailsFromThumb(thumbnails[position]);
        showDetails();
    });
}

function cycleLeft(thumbnails) {
    if (position === 0) {
        position = thumbnails.length - 1;
    } else {
        position--;
    }
}

function getCurrentPosition(thumbnails) {
    var index = 0;
    while (document.querySelector(DETAIL_TITLE_SELECTOR).textContent !== titleFromThumb(thumbnails[index])) {
        index++;
    }
    position = index;
}

function addRightButtonClickHandler(thumbnails) {
    'use strict';
    document.getElementById('right-button').addEventListener('click', function (event) {
        event.preventDefault();
        getCurrentPosition(thumbnails);
        cycleRight(thumbnails);
        setDetailsFromThumb(thumbnails[position]);
        showDetails();
    });
}

function cycleRight(thumbnails) {
    if (position === thumbnails.length - 1) {
        position = 0;
    } else {
        position++;
    }
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 100);
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();
    addLeftButtonClickHandler(thumbnails);
    addRightButtonClickHandler(thumbnails);
}


initializeEvents();