const BACKGROUND_COLORS = ['#020302', '#202620'];
const [PI_DOUBLE, PI_HALF, PI_QUARTER] = [Math.PI * 2, Math.PI / 2, Math.PI / 4];

const COLOR_MAX = 255;
const BASE_COLOR: [number, number, number] = [.7, .9, .7];

const WORDS = ['世界', '你好', 'Hello', 'World', '2020', '04-13', '94275.cn'];

const getRGB = ([red, green, blue]: number[]) =>
    `rgb(${ Math.floor(red * COLOR_MAX) }, ${ Math.floor(green * COLOR_MAX) }, ${ Math.floor(blue * COLOR_MAX) })`;

interface IPoint {
    x: number;
    y: number;
}

interface IVector extends IPoint {
    readonly length: number;
    multiply(value: number): void;
    add(vector: IPoint): void;
    distanceTo(vector: IPoint): number;
    angleTo(vector: IPoint): number;
}

class Vector implements IVector {
    x: number;
    y: number;

    private static getLength(x: number, y: number): number {
        return Math.sqrt(x * x + y * y);
    }

    public static getDistance(pointA: IPoint, pointB: IPoint): number {
        return Vector.getLength(
            pointA.x - pointB.x,
            pointA.y - pointB.y
        )
    }

    public static getDifference(pointA: IPoint, pointB: IPoint): IVector {
        return new Vector(
            pointA.x - pointB.x,
            pointA.y - pointB.y
        );
    }

    get length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add({ x, y }: IPoint) {
        this.x += x;
        this.y += y;
    }

    multiply(value: number) {
        this.x *= value;
        this.y *= value;
    }

    angleTo(vector: IPoint): number {
        return Math.atan2(
            vector.y - this.y,
            vector.x - this.x
        )
    }

    distanceTo(vector: IPoint): number {
        return Vector.getDistance(this, vector);
    }
}

class Particle implements IVector {
    public radius: number = 1;
    public mass: number = 1;

    public position: IVector;
    public acceleration: IVector = new Vector();
    public velocity: IVector = new Vector();
    public damping: number = 0;
    public gravityObjects: Particle[] = [];

    get x(): number {
        return this.position.x;
    }

    get y(): number {
        return this.position.y;
    }

    constructor(
        { position: { x, y }, radius, damping }: {
            position: IPoint;
            radius: number;
            damping: number;
        }
    ) {
        this.position = new Vector(x, y);
        this.radius = radius;
        this.damping = damping;
    }

    applyPhysic() {
        this.gravityObjects.forEach((gravityObject) => {
            const distance = Vector.getDistance(gravityObject, this);
            const angle = this.position.angleTo(gravityObject);
            const force = ((gravityObject.mass + this.mass) / (distance * distance)) || 0;
            const gravity = new Vector(
                Math.cos(angle) * force,
                Math.sin(angle) * force
            );
            this.velocity.add(gravity);
        });

        this.velocity.add(this.acceleration);
        this.velocity.multiply(1 - this.damping);
        this.position.add(this.velocity);
    }

    readonly length: number;

    add(vector: IPoint): void {
    }

    angleTo(vector: IPoint): number {
        return 0;
    }

    distanceTo(vector: IPoint): number {
        return 0;
    }

    multiply(value: number): void {
    }
}

class Spring extends Particle implements IVector {
    force: IVector;
    center: IVector;
    stiffness: number = 1;

    private weight: IVector;

    constructor(
        { position, center, radius, stiffness, damping }: {
            position: IPoint;
            center: IPoint;
            radius: number;
            stiffness: number;
            damping: number;
        }
    ) {
        super({ position, radius, damping });

        this.center = new Vector(center.x, center.y);
        this.stiffness = stiffness;
    }

    angleTo(vector: IPoint): number {
        throw new Error("Method not implemented.");
    }

    distanceTo(vector: IPoint): number {
        throw new Error("Method not implemented.");
    }
    add(vector: IPoint): void {
        throw new Error("Method not implemented.");
    }
    multiply(value: number): void {
        throw new Error("Method not implemented.");
    }
    length: number;

    applyPhysic() {
        this.force = Vector.getDifference(this.center, this.position);
        this.force.multiply(this.stiffness);

        this.velocity.add(this.force);

        super.applyPhysic();
    }
}

function main() {
    const canvasEl = <HTMLCanvasElement> document.getElementById('canvas');
    const context = canvasEl.getContext('2d');
    let { width, height } = canvasEl;

    const resize = () => {
        const { innerHeight, innerWidth } = window;

        canvasEl.width = innerWidth;
        canvasEl.height = innerHeight;
        width = innerWidth;
        height = innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const MAX_DISTANCE = 200;
    const BLOCK_SIZE = 10;
    const BYTE_OFFSET = 4;
    const MAX_OFFSET_X = 40;
    const MAX_OFFSET_Y = 10;
    const FONT_SIZE = 120;

    const textures = WORDS.map((word) => getTextTexture(word, FONT_SIZE));
    const [textureA, textureB] = textures;
    const center = {
        x: width / 2,
        y: height / 2
    };
    const radius = textureA.width / 2;
    // const particles = [];

    const positions = textures.map((texture) => {
        const result = [];

        for (let i = 0; i < texture.width / BLOCK_SIZE; i++) {
            for (let j = 0; j < texture.height / BLOCK_SIZE; j++) {
                const offset = Math.floor(j * BLOCK_SIZE * texture.width + i * BLOCK_SIZE + BLOCK_SIZE / 2) * BYTE_OFFSET;

                if (texture.data[offset]) {
                    result.push({
                        x: i * BLOCK_SIZE + (width - texture.width) / 2,
                        y: j * BLOCK_SIZE + (height - texture.height) / 2
                    });
                }
            }
        };

        return result;
    });

    let currentPositionsIndex = 0;

    const MAX_PARTICLES = 300;
    const particles = Array.from({ length: MAX_PARTICLES }, (_value, index) => {
            const currentPositions = positions[currentPositionsIndex];
            const position = currentPositions[index % currentPositions.length];

            return new Spring({
                position,
                radius: 1,
                center: position,
                stiffness: 0.03,
                damping: 0.25
            })
        }
    );

    const switchWord = () => {
        currentPositionsIndex = (currentPositionsIndex + 1) % textures.length;
        const currentTexture = textures[currentPositionsIndex];

        mutateParticles(
            particles,
            positions[currentPositionsIndex],
            { x: width / 2, y: height / 2 }
        );
    };

    const maxRadius = Math.sqrt((textureA.width / 2) * textureA.width / 2);

    const backgroundColor = getBackgroundColor(context, width, height);

    const PIXEL_SIZE = 9;
    const STROKE_OPACITY = 0.3;
    const ANIMATION_STEP = 0.02;
    const COLOR_OFFSET = -0.3;

    let animationProgress = 0;
    let prevPhase = -1;
    const step = () => {
        const { width, height } = canvasEl;

        animationProgress += ANIMATION_STEP;

        const phase = Math.sign(Math.sin(animationProgress));

        if (phase !== prevPhase) {
            prevPhase = phase;
            switchWord();
        }

        const fillScale = Math.abs(Math.sin(animationProgress + COLOR_OFFSET));
        const strokeScale = 1 - fillScale;

        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, width, height);

        context.save();

        context.fillStyle = getRGB(
            BASE_COLOR.map((color) => color * fillScale)
        );
        context.strokeStyle = getRGB(
            BASE_COLOR.map((color) => color * strokeScale)
        );

        particles.forEach((particle) => {

            particle.applyPhysic();

            context.save();
            context.translate(particle.x, particle.y);

            context.beginPath();

            context.rect(0, 0, PIXEL_SIZE, PIXEL_SIZE);

            context.fill();
            context.stroke();
            context.restore();
        });

        context.restore();

        requestAnimationFrame(step);
    }

    requestAnimationFrame(() => step());
    step();
}

function getTextTexture(
    text: string,
    fontSize: number
) {
    const canvasEl = new OffscreenCanvas(1024, 768);
    const context = canvasEl.getContext('2d');

    context.fillStyle = '#FFFFFF';
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.font = `bold ${ fontSize }px Arial`;
    context.fillText(text, 0, 0);

    const { width } = context.measureText(text);

    return context.getImageData(0, 0, width, fontSize);
}

function getBackgroundColor(context, width: number, height: number) {
    const gradient = context.createRadialGradient(
        width / 2,
        height / 2,
        width / 2,
        width / 2,
        height / 2,
        width
    );
    BACKGROUND_COLORS.forEach((color, index) => {
        gradient.addColorStop(index, color);
    })

    return gradient;
}

function mutateParticles(
    particles: Spring[],
    positions: IPoint[],
    defaultPosition: IPoint = { x: 0, y: 0 }
) {
    shuffleArray(particles).forEach((particle, i) => {
        const { x, y } = positions[i % positions.length] || defaultPosition;

        const angle = particle.position.angleTo(defaultPosition);
        const distance = particle.position.distanceTo(defaultPosition);

        particle.center = { x, y };
    });
}

function shuffleArray(array: any[]) {
    if (array.length <= 1) { return array; }

    for (let index = 0; index < array.length - 1; index++) {
        const cursor = array.length - index - 1;
        const randomIndex = Math.floor((array.length - index) * Math.random());

        [array[cursor], array[randomIndex]] = [array[randomIndex], array[cursor]];
    }

    return array;
}

document.addEventListener('DOMContentLoaded', main)

