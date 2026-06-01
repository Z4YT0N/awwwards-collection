# Landing Page Clone of 'https://thisismagma.com/'

![image](https://github.com/vijita-u/Magma_Landing-Page_Clone/assets/96591032/d39957b6-3237-40c8-af8d-a634621df4a4)

## Live Link: [Magma Landing Page Clone](https://vijita-u.github.io/Magma_Landing-Page_Clone/)

## Overview
This project is a clone of the landing page of 'https://thisismagma.com/' with the goal of learning and implementing various web development technologies and techniques. The project includes HTML5 Canvas animations, scrolling animations using GSAP Scroll Trigger & Locomotive, a carousel using Swiper JS and text animations using TextillateJS.

## Motivation
The primary motivation behind this project was to acquire hands-on experience with the following technologies and concepts:

1. HTML5 Canvas
2. GSAP animations
3. GSAP Scroll Trigger
4. Locomotive
5. SwiperJS
   
## Live Demo
You can view a live demo of this project at [Magma Live Demo Link](https://vijita-u.github.io/Magma_Landing-Page_Clone/).

## Features

### 1. HTML5 Canvas Animations

#### Getting Started
- Add an empty <canvas> tag to the html file.

```html
   <canvas></canvas>
```

#### Implementing a function to take care of all HTML5 Canvas Animations:
  ##### - Parameters -
  - **page**: A string representing the page of the HTML element containing the canvas where the animation will be displayed.
  - **data**: A string containing image file paths separated by line breaks (\n). These image files represent the frames of the animation.

  ```javascript
  function canvas(page, data) {
    ...
  }
  ```
  Let's now move on to the description of the code inside the function.

  #### Canvas Initialization and Context Setup -
  - The function starts by selecting the HTML canvas element specified by the page parameter and getting its 2D rendering context.
  - It sets the canvas dimensions to match the window's dimensions, making it responsive to window resizing.

  ```javascript
    const canvas = document.querySelector(`${page} canvas`);
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  ```

  #### Window Resize Event Listener -
  - An event listener is added to the window's resize event, so whenever the window size changes, the canvas dimensions are updated, and the render() function is called to redraw the animation.

  ```javascript
    window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
    });
  ```
  - We'll talk about the render() function a little later.

  #### Image Loading and Initialization -
  - The **data** parameter is split into an array of image file paths, with each line representing a frame in the animation.
  - An array called **images** is created to store image objects, and an object called **imageSequence** is initialized with a frame property set to 0, representing the current frame of the animation.
  - A loop iterates through the image file paths and creates <img> elements for each image, sets their **src** attributes to the respective file paths, and adds them to the images array.
  
  ```javascript
    const imageFiles = data.split("\n"); // Image array
    const frameCount = imageFiles.length; // Image count

    const images = [];
    const imageSequence = {
    frame: 0,
    };

    for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = imageFiles[i];
    images.push(img);
    }
  ```

  #### GSAP ScrollTrigger Animation -
  - GSAP (GreenSock Animation Platform) is used to tween (animate) the **imageSequence object's frame** property.
  - The animation changes the frame property from 0 to the total number of frames in the animation (frameCount). It uses the snap option to ensure that the animation only uses whole numbers for frames.
  - This animation is scroll-triggered, meaning it plays as the user scrolls down the page. The ScrollTrigger settings include a scrub of 0.5, which controls the sensitivity of the animation to scrolling, and a     **start** and **end** point within the trigger specified by **${page}**.
  - The **onUpdate** callback function, render(), is called whenever the animation updates to redraw the current frame.

  ```javascript
    gsap.to(imageSequence, {
      frame: frameCount,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        scrub: 0.5,
        trigger: `${page}`,
        start: "top top",
        end: "250% top",
        scroller: "#main",
      },
      onUpdate: render,
    });
  ```

  #### Rendering Function - render() - 
  -The render function is responsible for rendering the current frame on the canvas.
  - It calls the **scaleImage function** to scale and center the current image frame on the canvas.

  ```javascript
    function render() {
      scaleImage(images[imageSequence.frame], context);
    }
  ```

  #### Image Scaling Function - scaleImage() -
  - The **scaleImage function** calculates the scaling ratio based on the canvas and image dimensions, ensuring the image is centered and scaled appropriately.
  
  ```javascript
    function scaleImage(image, context) {
      let canvas = context.canvas;
      let horizontalRatio = canvas.width / image.width;
      let verticalRatio = canvas.height / image.height;
      let ratio = Math.max(horizontalRatio, verticalRatio);
      let centerShift_x = (canvas.width - image.width * ratio) / 2;
      let centerShift_y = (canvas.height - image.height * ratio) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        centerShift_x,
        centerShift_y,
        image.width * ratio,
        image.height * ratio
    );
  }
  ```

  #### ScrollTrigger Pinning -
  - Lastly, a ScrollTrigger is created to pin the specified page element when it enters the viewport. This pins the content as the user scrolls.

  ```javascript
    ScrollTrigger.create({
		  trigger: `${page}`,
		  pin: true,
		  scroller: "#main",
		  start: "top top",
		  end: "250% top",
	  });
  }
  ```

Overall, this function combines HTML5 Canvas rendering, image loading, GSAP animation with ScrollTrigger, and responsive design techniques to create a visually appealing and scroll-triggered animation on a webpage.

### 2. Scrolling Animations
- In this project, Locomotive Scroll and Scroll Trigger have been merged to combine Locomotive Scroll's smooth scrolling and speed along with GSAP Scroll Trigger's ease of creating animations.
- The above has been made possible by the JS code provided in [this codepen](https://codepen.io/GreenSock/pen/ExPdqKy).

  #### Set up
  - ##### Locomotive CDN
    ```html
    	<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll@3.5.4/dist/locomotive-scroll.js"></script>
    ```
  - ##### GSAP CDN
    ```html
    	<script
	  src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
	  integrity="sha512-16esztaSRplJROstbIIdwX3N97V1+pZvV33ABoG1H2OyTttBxEGkTsoIVsiP1iaTtM8b3+hu2kB6pQ4Clr5yug=="
	  crossorigin="anonymous"
	  referrerpolicy="no-referrer"
	></script>
    ```
  - ##### Scroll Trigger CDN
    ```html
    	<script
	  src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
	  integrity="sha512-Ic9xkERjyZ1xgJ5svx3y0u3xrvfT/uPkV99LBwe68xjy/mGtO+4eURHZBW2xW4SZbFrF1Tf090XqB+EVgXnVjw=="
	  crossorigin="anonymous"
	  referrerpolicy="no-referrer"
	></script>
    ```

### 3. Carousel using Swiper JS

  #### Getting Started
  - Include the swiperJS's JavaScript and CSS CDN in your index.html file. Refer [Swiper Js's Docs](https://swiperjs.com/get-started)

    Add link tag inside the <head> tag.
    ```html
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
      </head>
    ```
    Add script tag at the end inside the <body> tag.
    ```html
      <body>
        ...
        ...
        <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
      </body>
    ```

  #### HTML Code Snippet 
  - Go to [Swiper Js's Demo Section](https://swiperjs.com/demos) and copy the code snippet that suits your requirements to you HTML file.

  ```html
     <div class="swiper mySwiper">
	<div class="swiper-wrapper">
	  <div class="swiper-slide">
		....
	  </div>
	</div>
     </div>
	
  ```

  #### Configure SwiperJS Carousel
  ```javascript

    // Swiper JS Carousel Configuration

    // Create a new Swiper instance targeting the HTML element with the class "mySwiper".
    var swiper = new Swiper(".mySwiper", {
      // Display one slide at a time.
      slidesPerView: 1,
  
      // Add spacing (20 pixels) between each slide.
      spaceBetween: 20,
  
      // Center the currently active slide.
      centeredSlides: true,
  
      // Set the transition speed to 3000 milliseconds (3 seconds).
      speed: 3000,
  
      // Use the "slide" effect for slide transitions.
      effect: "slide",
  
      // Enable loop mode to create an infinite carousel.
      loop: true,
  
      // Start the carousel with the second slide (initialSlide: 1).
      initialSlide: 1,
  
      // Configure autoplay settings.
      autoplay: {
        // Delay between slides (0 milliseconds for immediate transitions).
        delay: 0,
    
        // Reverse direction when reaching the end of the slides.
        reverseDirection: true,
    
        // Do not disable autoplay on user interaction (e.g., clicking or swiping).
        disableOnInteraction: false,
      },
  
      // Define responsive breakpoints for different screen sizes.
      breakpoints: {
        // Screen width 340px and above:
        340: {
          slidesPerView: 2, // Display 2 slides at a time.
          spaceBetween: 30, // Increase spacing to 30 pixels.
        },
    
        // Screen width 640px and above:
        640: {
          slidesPerView: 3, // Display 3 slides at a time.
          spaceBetween: 15, // Reduce spacing to 15 pixels.
        },
    
        // Screen width 768px and above:
        768: {
          slidesPerView: 4, // Display 4 slides at a time.
          spaceBetween: 40, // Increase spacing to 40 pixels.
        },
    
        // Screen width 1024px and above:
        1024: {
          slidesPerView: 5, // Display 5 slides at a time.
          spaceBetween: 50, // Increase spacing to 50 pixels.
        },
      },
    });

  ```

### 4. Responsive Design
- The website has been made responsive using sass mixins for better code management.
- The burger menu in the site has been made to work exactly as the original website which makes tjhe website more responsive and interactive like the original.

## Resources Used
- **Original Landing Page** : [Magma Landing Page](https://thisismagma.com/)
- **Youtube Tutorial**: [Sheriyan's Coding School's Youtube Video](https://youtu.be/n6UPwT2hf_g?si=5j5HCjAaFe4jgwZY)

## Project Highlights
In this project, I've undertaken several key initiatives to enhance and expand upon the original tutorial, making the website more versatile, feature-rich and close to the original one. Here are the project highlights:

  ### 1. Cross-Device Compatibility:
  The website is meticulously crafted to ensure cross-device compatibility, guaranteeing a seamless and responsive user experience on various screen sizes and devices.

  ### 2. Burger Menu Animation:
  I've cloned the captivating burger menu animation from the original website, replicating its visual appeal and interactive behavior.

  ### 3. Additional Pages:
  To further strengthen my web development skills, I've created several additional pages that were not covered in the tutorial. Each page served as a canvas for practicing and showcasing different technologies and techniques:

  - **Page 8 - Button Animation**:
    	I implemented GSAP to animate the button on scroll to replicate the original as much as possible.
  - **Page 9 - Heading Animation with Textillate.js**:
    	Using Textillate.js I created an animation similar to the original site.
  - **Page 10 -  Canvas Animation**:
    	This page, originally omitted in the tutorial, was a creative challenge. I leveraged HTML5 Canvas, ScrollTrigger, CSS, and JavaScript to replicate the entire animation from scratch. This challenging task pushed my creative and technical boundaries.
  - **Page 11 - Created from Scratch**:
    	Page 11 was not covered in the tutorial, so I took it upon myself to create it entirely from scratch, demonstrating my ability to design and implement web pages independently.
  - **Page 12 - Carousel Integration**:
    	Another missing element from the tutorial was a carousel. Using my knowledge gained from a previous project, I integrated a carousel on page 12, showcasing my proficiency with SwiperJS. This page, too, was crafted from the ground up.
  - **Code Refactoring**:
    	To ensure a clean and maintainable codebase, I refactored the JavaScript code in script.js by organizing it into functions. This approach minimizes redundancy and improves code readability.
  - **Sass Implementation**:
    	In place of traditional CSS, I opted for Sass to enhance code maintainability and readability, ensuring a more efficient development process.
  - **Unique CSS and HTML**:
    	I crafted my own CSS and HTML code for each page, providing a fresh take that deviates significantly from the original tutorial in most cases.


## Tools Used
- HTML
- CSS
- JS
- Sass
- Locomotive
- GSAP
- GSAP Scroll Trigger
- HTML5 Canvas
- SwiperJs
- TextillateJs

## Usage

### 1. Cloning the repository
```bash
  git clone https://github.com/vijita-u/Magma_Landing-Page_Clone.git
```

### 2. Open the project in VS Code
```
Go to "File" -> "Open Folder" and select the folder where you cloned the repository. This will open the project in your code editor.
```
### 3. Launching the Website
- **Install Ritwick Dey's Live Server Extension (if not installed)**
- **Launch the live server**

### 4. Update CDN Links (If required)
Make sure to save the changes.

### 5. View the website

**That's it. You have cloned the repository.**

## Future Improvements
As I've completed this website, I've become aware of its high resource consumption and occasional performance issues. I am eager to acquire knowledge and skills in optimizing the website to make it more lightweight and responsive.

## Contributions
- This project was inspired by the original [Magma Landing Page](https://thisismagma.com/) website and [Sheriyan Coding School's Youtube Video](https://youtu.be/n6UPwT2hf_g?si=5j5HCjAaFe4jgwZY).

## License
This project is open-source and available under the [MIT License](https://github.com/vijita-u/Magma_Landing-Page_Clone/blob/main/LICENSE).

## Acknowledgments
Special thanks to [Sheriyan's Coding School](https://sheryians.com/) for putting out amazing content out there.

## Contact
- [Email me](mailto:udayvijita3009@gmail.com?subject=Github%20Message)

- [Let's connect on LinkedIn](https://www.linkedin.com/in/vijita-uday/)

- [Check out portfolio website](https://vijita-u.github.io/Portfolio_Vijita_Uday_ReactJs/)
