const moon = document.getElementById('moonWrapper');
const surpriseLayer = document.getElementById('surpriseLayer');
const introText = document.getElementById('introText');
const mainHeading = document.getElementById('mainHeading');
const wishText = document.getElementById('wishText');
const giftContainer = document.getElementById('giftContainer');

const WISH_CONTENT = "Zindagi ki har khushi apky dam sy ha, mera yeh sara jahan apky dam sy ha. Chand ki roshni sy jesi ha chamak apki muskurahat mein, mera yeh har armaan apky dam sy ha. Chand Raat Mubarak to the love of my life!";

let isSurprised = false;

moon.addEventListener('click', () => {
    if (isSurprised) return;
    isSurprised = true;

    // 1. Fade out original content
    document.querySelector('.hint').style.opacity = '0';
    introText.style.transition = 'opacity 1s ease';
    introText.style.opacity = '0';

    // 2. Show surprise layer
    surpriseLayer.style.opacity = '1';
    surpriseLayer.style.pointerEvents = 'auto';

    // 3. Start Sequence
    setTimeout(() => {
        typeText(mainHeading, "Mary Chand ko Chand Raat Mubarak", 100, () => {
            // Typing the wish faster as requested
            setTimeout(() => {
                typeText(wishText, WISH_CONTENT, 40, () => {
                    // Sequence change: Fade out text, then show gift as overlay
                    setTimeout(() => {
                        mainHeading.style.transition = 'opacity 1.5s ease';
                        wishText.style.transition = 'opacity 1.5s ease';
                        mainHeading.style.opacity = '0';
                        wishText.style.opacity = '0';

                        // Clear space after fade
                        setTimeout(() => {
                            mainHeading.style.display = 'none';
                            wishText.style.display = 'none';
                        }, 1500);

                        // Update from-text content for the final reveal
                        document.querySelector('.from-text').innerHTML = "Yeh booket meri tarf sy gift, Sirf Neelam k liyeh🤭";

                        setTimeout(() => {
                            giftContainer.classList.add('show');
                        }, 1500);
                    }, 3000); // 3 seconds to read the wish
                });
            }, 500);
        });
    }, 1000);
});

function typeText(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = ""; // Clear before typing
    element.classList.add('typing');

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            element.classList.remove('typing');
            if (callback) callback();
        }
    }
    typing();
}
