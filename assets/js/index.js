document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);

  var wrapper = document.querySelector(".intro-wrapper");
  var divItems = document.querySelectorAll(".intro-item");
  var container = document.querySelector(".intro-container");

  var introCompleted = false;

  var cover = document.querySelector(".color-cover");

  //color change vars
  var docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var prevScrollPercentage = 0; // Initialize previous scroll percentage

  
  // intro

  // Disable scrolling initially
  disableScroll();

  container.addEventListener("click", function () {
    var currentIndex = Array.from(divItems).findIndex(item => item.style.display !== "none");
    var nextIndex = currentIndex + 1;

    if (nextIndex < divItems.length) {
        divItems[currentIndex].style.display = "none";
        divItems[nextIndex].style.display = "block";
    } else {
        wrapper.style.opacity = "0"; // Dissolve the container
        wrapper.addEventListener("transitionend", function () {
            wrapper.style.display = "none"; // Set display to none after transition
            enableScroll(); // Re-enable scrolling
            introCompleted = true; // Set introCompleted flag to true
        });
    }
    disableScroll(); // Disable scrolling when the container is visible
});

  function disableScroll() {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed"; // Fix position to prevent scrolling
  }

  function enableScroll() {
    document.body.style.overflow = "";
    document.body.style.position = ""; // Reset position to allow scrolling
  }

  // colour change function, placed inside intro because intro interferes with scroll calc

  window.addEventListener("scroll", function () {
    if (introCompleted) {
      var scrollPercentage =
        (document.documentElement.scrollTop + document.body.scrollTop) /
        docHeight;

      // Check if the current scroll percentage is greater than the previous one
      if (scrollPercentage > prevScrollPercentage) {
        prevScrollPercentage = scrollPercentage; // Update previous scroll percentage

        var targetRed = 31;
        var targetGreen = 85;
        var targetBlue = 39;

        var initialRed = 0;
        var initialGreen = 0;
        var initialBlue = 0;

        console.log(scrollPercentage)
        var currentRed = Math.round(initialRed + (targetRed - initialRed) * scrollPercentage);
        var currentGreen = Math.round(initialGreen + (targetGreen - initialGreen) * scrollPercentage);
        var currentBlue = Math.round(initialBlue + (targetBlue - initialBlue) * scrollPercentage);

        cover.style.backgroundColor =
          "rgb(" + currentRed + "," + currentGreen + "," + currentBlue + ")";
      }
    }
  });

  // intro

  // running footer

  const containers = document.querySelectorAll(".section-container");

  containers.forEach(container => {
      const sections = container.querySelectorAll(".caption-section");
      const footer = container.querySelector(".footer-title");

      const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const sectionTitle = entry.target.querySelector("h2").innerText;
                  footer.innerText = `${sectionTitle}`;
              }
          });
      }, { threshold: 0.5 });

      sections.forEach(section => {
          observer.observe(section);
      });
  });

  // running footer

  // fade in
  const faders = document.querySelectorAll(".fade-in");
  const appearOptions = {
    threshold: 0.29,
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });


//info section pop up
const infoButton = document.querySelector('.info-button');
const infoContainer = document.querySelector('.info-container');

infoButton.addEventListener('click', function() {
  if (infoContainer.style.visibility === 'visible') {
    infoContainer.style.visibility = 'hidden';
    infoContainer.style.opacity = '0';
    infoButton.innerHTML = '(i)';

  } else {
    infoContainer.style.visibility = 'visible';
    infoContainer.style.opacity = '1';
    infoButton.innerHTML = '(x)'; 

  }
});


//info section pop up





  // reveal and hide footnotes

  // var clickableDivs = document.querySelectorAll('.clickable-title');

  // var targetDivs = document.querySelectorAll('.footnotes');


  // clickableDivs.forEach(function(clickableDiv, index) {

  //   clickableDiv.addEventListener('click', function() {
     
  //     targetDivs[index].classList.toggle('hidden-footnotes');
  //   });
  // });


  // reveal and hide footnotes end



  // hover effect

  // const images = document.querySelectorAll('.image');

  // images.forEach(function(image) {
  //   image.addEventListener('mouseover', function() {
  //     this.classList.add('visible');
  //   });
  // });
  // hover effect

  //sticky fade

  // var stickyBox = document.querySelector(".sticky");
  // var yOffset = stickyBox.offsetTop;
  // var isStuck = false;

  // window.addEventListener("scroll", function() {
  //   if (window.scrollY > yOffset) {
  //     if (!isStuck) {
  //       stickyBox.classList.add("stuck");
  //       isStuck = true;
  //     }
  //     var distance = window.scrollY - yOffset;
  //     // Adjust the rate of fade-out by changing the divisor (e.g., from 300 to a higher value)
  //     stickyBox.style.opacity = 1 - distance / 1200; // Adjust as per your requirement
  //   } else {
  //     stickyBox.classList.remove("stuck");
  //     stickyBox.style.opacity = 1;
  //     isStuck = false;
  //   }
  // });

  //sticky fade

  //short story pop up

  document.getElementById('specific-link').addEventListener('click', (e) => {
    e.preventDefault();
    fetch(document.getElementById('specific-link').href).then((res) => res.text()).then((data) => {
      const html = new DOMParser().parseFromString(data, 'text/html');
      const section = html.querySelector('.caption-section');
      const div = document.createElement('div');
      div.classList.add('overlay');
      div.innerHTML = section.outerHTML;
      document.body.appendChild(div);
      document.body.style.overflow = 'hidden';
                smartquotes()


      setTimeout(() => {
        document.querySelector('.overlay').style.opacity = 1; // Add transition to fade in
      }, 100);
  

      document.querySelector('.back').addEventListener('click', () => {
        document.querySelector('.overlay').style.opacity = 0; // Add transition to fade out
        setTimeout(() => {
          document.querySelector('.overlay').remove();
          document.body.style.overflow = '';
        }, 1000); // Match transition duration
      })
    })
  })


});
