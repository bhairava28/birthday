document.addEventListener("DOMContentLoaded", function() {
    // Flower Emojis
    const flowers = ["🌸", "🌼", "🌺", "🌻", "🌷", "💐", "💖", "💕", "💗"];

    // Function to generate a random flower emoji
    function getRandomFlower() {
        return flowers[Math.floor(Math.random() * flowers.length)];
    }

    // Insert flower emojis into the title and message
    document.getElementById("title").innerHTML = `Happy Birthday, Nithishma Reddy ${getRandomFlower()}!`;
    document.getElementById("subtitle").innerHTML = `🎉 Wishing You All the Best on Your Special Day! 🎉`;
    document.getElementById("message").innerHTML = `Your elegance and simplicity are truly inspiring. Whether you're in a beautiful dress or just being your wonderful self, you always manage to light up the room. May your special day be filled with joy and love. ${getRandomFlower()}`;

    // Function to create a moving flower within the container
    function createFlower() {
        const flower = document.createElement("div");
        flower.className = "flower";
        flower.textContent = getRandomFlower();
        
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        
        flower.style.left = `${Math.random() * (containerRect.width - 50)}px`; // Random horizontal position within container
        flower.style.top = `${Math.random() * (containerRect.height - 50)}px`; // Random vertical position within container
        flower.style.animationDuration = `${Math.random() * 5 + 5}s`; // Random speed

        container.appendChild(flower);
        
        // Remove flower after animation is complete
        setTimeout(() => {
            flower.remove();
        }, 10000); // Match with animation duration
    }

    // Create more flowers at faster intervals
    setInterval(createFlower, 500); // Adjust interval to control flower density

    // Create static background flowers
    function createBackgroundFlowers() {
        const container = document.body;
        for (let i = 0; i < 30; i++) { // Increased number of background flowers
            const flower = document.createElement("div");
            flower.className = "background-flower";
            flower.textContent = getRandomFlower();
            flower.style.left = `${Math.random() * 100}vw`; // Random horizontal position
            flower.style.top = `${Math.random() * 100}vh`; // Random vertical position
            container.appendChild(flower);
        }
    }

    createBackgroundFlowers();
});
