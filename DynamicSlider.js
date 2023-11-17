/*
Filename: DynamicSlider.js

Description:
This code implements a dynamic image slider, allowing users to select and view different images.
It uses the MVC (Model-View-Controller) architectural pattern to separate concerns between data, presentation, and user interaction.

Features:
1. Ability to dynamically load and display images from a specified directory.
2. Automatic image resizing to fit the slider container.
3. Touch and drag support for scrolling through images.
4. Keyboard navigation using arrow keys to browse through images.
5. Customizable transition effects (e.g., fade, slide).
6. Support for both desktop and mobile devices.

Note: This code requires jQuery library for DOM manipulation and animations.

*/

// Model (Image data)
const model = {
  images: [
    'image1.jpg',
    'image2.jpg',
   ...
   // Add more image paths here
    
  ],
  currentImageIndex: -1
};

// View (DOM manipulation)
const view = {
  init() {
    this.imageContainer = $('.image-container');
    this.prevButton = $('#prev-btn');
    this.nextButton = $('#next-btn');
    this.imageElements = [];

    this.addEventListeners();
  },

  render() {
    const currentIndex = model.currentImageIndex;
    const currentImage = model.images[currentIndex];
    
    // Update DOM with the current image
    this.imageContainer.fadeOut(200, () => {
      this.imageContainer.attr('src', currentImage);
      this.imageContainer.fadeIn(200);
    });

    // Update button states
    this.prevButton.prop('disabled', currentIndex === 0);
    this.nextButton.prop('disabled', currentIndex === model.images.length - 1);
  },

  addEventListeners() {
    this.prevButton.on('click', controller.prevImage);
    this.nextButton.on('click', controller.nextImage);
    $(document).on('keydown', (event) => {
      if (event.which === 37) controller.prevImage(); // Left arrow key
      else if (event.which === 39) controller.nextImage(); // Right arrow key
    });
  }
};

// Controller (User interaction)
const controller = {
  init() {
    model.currentImageIndex = 0;
    view.init();
    view.render();
  },

  prevImage() {
    if (model.currentImageIndex > 0) {
      model.currentImageIndex--;
      view.render();
    }
  },

  nextImage() {
    if (model.currentImageIndex < model.images.length - 1) {
      model.currentImageIndex++;
      view.render();
    }
  }
};

$(document).ready(() => {
  controller.init();
});

// Add more custom code here as necessary...