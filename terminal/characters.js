/**
 * MRW Terminal Characters
 * Mario & Luigi character definitions with states and abilities
 */

class Character {
    constructor(config) {
        this.name = config.name;
        this.emoji = config.emoji;
        this.sprite = config.sprite;
        this.color = config.color;
        
        // Physics properties
        this.x = config.x || 10;
        this.y = config.y || 0;
        this.velocityX = 0;
        this.velocityY = 0;
        this.mass = config.mass || 1.0;
        this.jumpForce = config.jumpForce || 12;
        this.runSpeed = config.runSpeed || 5;
        this.jumpCharge = 0;
        
        // State
        this.state = 'idle';  // idle, running, jumping, powered
        this.grounded = true;
        this.direction = 1;  // 1 = right, -1 = left
        this.powered = false;
        this.starPower = false;
        
        // Abilities
        this.abilities = config.abilities || [];
        this.voiceLines = config.voiceLines || [];
        
        // Animation
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.animationSpeed = 0.1;
    }
    
    /**
     * Update character state based on velocity and inputs
     */
    updateState() {
        if (this.starPower) {
            this.state = 'powered';
        } else if (!this.grounded) {
            this.state = 'jumping';
        } else if (Math.abs(this.velocityX) > 0.5) {
            this.state = 'running';
        } else {
            this.state = 'idle';
        }
    }
    
    /**
     * Get current sprite representation
     */
    getSprite() {
        const states = {
            'idle': this.sprite,
            'running': this.animationFrame % 2 === 0 ? this.sprite.toLowerCase() : this.sprite,
            'jumping': '^' + this.sprite + '^',
            'powered': '⭐' + this.sprite + '⭐'
        };
        
        return states[this.state] || this.sprite;
    }
    
    /**
     * Get colored representation
     */
    getColoredSprite() {
        return `<span style="color: ${this.color};">${this.getSprite()}</span>`;
    }
    
    /**
     * Update animation frame
     */
    updateAnimation(deltaTime) {
        this.animationTimer += deltaTime;
        if (this.animationTimer >= this.animationSpeed) {
            this.animationFrame++;
            this.animationTimer = 0;
        }
    }
    
    /**
     * Activate power-up
     */
    powerUp(type) {
        switch(type) {
            case 'mushroom':
                this.powered = true;
                this.jumpForce *= 1.2;
                break;
            case 'star':
                this.starPower = true;
                setTimeout(() => { this.starPower = false; }, 10000);
                break;
            case 'fire':
                this.powered = true;
                this.abilities.push('fire_power');
                break;
        }
    }
    
    /**
     * Say a random voice line
     */
    speak() {
        if (this.voiceLines.length > 0) {
            const line = this.voiceLines[Math.floor(Math.random() * this.voiceLines.length)];
            return `${this.name}: "${line}"`;
        }
        return '';
    }
}

class Vehicle {
    constructor(config) {
        this.name = config.name;
        this.emoji = config.emoji;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.velocityX = 0;
        this.state = config.state || 'parked';
        this.maxSpeed = config.maxSpeed || 10;
        this.animationFrames = config.animationFrames || [this.emoji];
        this.currentFrame = 0;
    }
    
    /**
     * Get current sprite
     */
    getSprite() {
        if (this.state === 'driving' && this.animationFrames.length > 1) {
            return this.animationFrames[this.currentFrame % this.animationFrames.length];
        }
        return this.emoji;
    }
    
    /**
     * Update animation
     */
    updateAnimation() {
        if (this.state === 'driving') {
            this.currentFrame++;
        }
    }
    
    /**
     * Start driving
     */
    startDriving() {
        this.state = 'driving';
    }
    
    /**
     * Stop vehicle
     */
    stop() {
        this.state = 'parked';
        this.velocityX = 0;
    }
}

// Predefined characters
const MARIO = {
    name: 'Mario',
    emoji: '🍄',
    sprite: 'M',
    color: '#ff0000',
    mass: 1.0,
    jumpForce: 12,
    runSpeed: 5,
    abilities: ['jump', 'run', 'collect_coins', 'power_up'],
    voiceLines: ["Let's-a-go!", "Wahoo!", "Here we go!", "Mamma mia!"]
};

const LUIGI = {
    name: 'Luigi',
    emoji: '💚',
    sprite: 'L',
    color: '#00ff00',
    mass: 0.9,
    jumpForce: 14,
    runSpeed: 4.5,
    abilities: ['high_jump', 'run', 'collect_coins', 'power_up'],
    voiceLines: ["Okey-dokey!", "Let's go!", "Yahoo!", "Oh yeah!"]
};

// Predefined vehicles
const KART = {
    name: 'Mario Kart',
    emoji: '🏎️',
    maxSpeed: 15,
    animationFrames: ['🏎️  ', ' 🏎️ ', '  🏎️', '   🏎️']
};

const PIPE_CART = {
    name: 'Pipe Cart',
    emoji: '🚂',
    maxSpeed: 8,
    animationFrames: ['🚂', '🚃']
};

// Items
const ITEMS = {
    mushroom: { emoji: '🍄', type: 'power_up', effect: 'grow' },
    star: { emoji: '⭐', type: 'power_up', effect: 'invincibility' },
    coin: { emoji: '💰', type: 'collectible', value: 1 },
    fire_flower: { emoji: '🌸', type: 'power_up', effect: 'fire_power' }
};

// Export for use in terminal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Character,
        Vehicle,
        MARIO,
        LUIGI,
        KART,
        PIPE_CART,
        ITEMS
    };
}
