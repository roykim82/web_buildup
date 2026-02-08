
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

// Dummy data for the last 5 years of winning numbers
document.getElementById('generate').addEventListener('click', () => {
    const luckyNumbers = [];
    while (luckyNumbers.length < 6) {
        const randomNumber = Math.floor(Math.random() * 49) + 1;
        if (!luckyNumbers.includes(randomNumber)) {
            luckyNumbers.push(randomNumber);
        }
    }
    luckyNumbers.sort((a, b) => a - b); // Sort numbers for better display

    displayNumbers(luckyNumbers);
});

function displayNumbers(numbers) {
    const numbersDiv = document.getElementById('numbers');
    numbersDiv.innerHTML = '';
    numbers.forEach(num => {
        const numberBall = document.createElement('div');
        numberBall.className = 'number-ball';
        numberBall.textContent = num;
        numberBall.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
        numbersDiv.appendChild(numberBall);
    });
}

// Three.js animation
const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(0.5, 32, 32);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.7, roughness: 0.2 });

for (let i = 0; i < 50; i++) {
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = (Math.random() - 0.5) * 10;
    sphere.position.y = (Math.random() - 0.5) * 10;
    sphere.position.z = (Math.random() - 0.5) * 10;
    scene.add(sphere);
}

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 5);
scene.add(light);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    scene.rotation.x += 0.001;
    scene.rotation.y += 0.001;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


