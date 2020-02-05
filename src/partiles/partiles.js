var particles;

particles = Particles.init({
    selector: ".background",
    color: ["#DA0463", "#404B69", "#DBEDF3"],
    connectParticles: true,
    speed: 0.8
});

function pause() {
    particles.pauseAnimation();
}

function resume() {
    particles.resumeAnimation();
}
