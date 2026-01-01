/**
 * MRW Terminal Physics Engine
 * Capacitor-Resistor based jump physics system
 * Inspired by RC circuit behavior for natural, responsive character movement
 */

class PhysicsEngine {
    constructor() {
        // Physics constants
        this.gravity = 9.8;
        this.capacitance = 1.0;  // Jump "charge" capacity
        this.resistance = 0.5;   // Air resistance factor
        this.timeConstant = this.resistance * this.capacitance;  // RC time constant
        this.terminalVelocity = 15;
        this.groundFriction = 0.8;
        this.airFriction = 0.95;
        
        // Frame timing
        this.deltaTime = 1/30;  // 30 FPS
    }
    
    /**
     * Capacitor Jump - Rapid charge on input, exponential discharge during fall
     * Models RC circuit: V(t) = V₀ * e^(-t/RC)
     */
    applyCapacitorJump(entity, jumpPressed) {
        if (jumpPressed && entity.grounded) {
            // Rapid charge - instant jump force application
            entity.velocityY = -entity.jumpForce;
            entity.grounded = false;
            entity.jumpCharge = entity.jumpForce;
        }
        
        if (!entity.grounded && entity.velocityY > 0) {
            // Exponential discharge during fall (like capacitor discharge)
            const dischargeFactor = Math.exp(-this.deltaTime / this.timeConstant);
            entity.jumpCharge *= dischargeFactor;
            
            // Apply residual charge to slow initial fall
            entity.velocityY -= entity.jumpCharge * 0.1 * this.deltaTime;
        }
    }
    
    /**
     * Resistor Friction - Linear ground friction, quadratic air resistance
     */
    applyResistorFriction(entity) {
        if (entity.grounded) {
            // Linear resistance when grounded (Ohm's law: V = IR)
            entity.velocityX *= this.groundFriction;
            
            // Stop if velocity is very small
            if (Math.abs(entity.velocityX) < 0.1) {
                entity.velocityX = 0;
            }
        } else {
            // Quadratic drag in air (F = -k*v²)
            const dragX = entity.velocityX * Math.abs(entity.velocityX) * 0.01;
            const dragY = entity.velocityY * Math.abs(entity.velocityY) * 0.01;
            
            entity.velocityX -= dragX * this.deltaTime;
            entity.velocityY += dragY * this.deltaTime;
            
            // Apply air friction
            entity.velocityX *= this.airFriction;
        }
    }
    
    /**
     * Apply gravity with terminal velocity limit
     */
    applyGravity(entity) {
        if (!entity.grounded) {
            entity.velocityY += this.gravity * entity.mass * this.deltaTime;
            
            // Enforce terminal velocity
            if (entity.velocityY > this.terminalVelocity) {
                entity.velocityY = this.terminalVelocity;
            }
        }
    }
    
    /**
     * Update entity position based on velocity
     */
    updatePosition(entity) {
        entity.x += entity.velocityX * this.deltaTime;
        entity.y += entity.velocityY * this.deltaTime;
    }
    
    /**
     * Check and resolve ground collision
     */
    checkGroundCollision(entity, groundY) {
        if (entity.y >= groundY) {
            entity.y = groundY;
            entity.velocityY = 0;
            entity.grounded = true;
            entity.jumpCharge = 0;
        } else {
            entity.grounded = false;
        }
    }
    
    /**
     * Apply horizontal movement force
     */
    applyMovement(entity, direction, running) {
        const force = running ? entity.runSpeed * 1.5 : entity.runSpeed;
        
        if (entity.grounded) {
            entity.velocityX = direction * force;
        } else {
            // Reduced air control
            entity.velocityX += direction * force * 0.3 * this.deltaTime;
            
            // Limit air speed
            const maxAirSpeed = force * 1.2;
            if (Math.abs(entity.velocityX) > maxAirSpeed) {
                entity.velocityX = Math.sign(entity.velocityX) * maxAirSpeed;
            }
        }
    }
    
    /**
     * Main physics update step
     */
    update(entity, inputs, groundY) {
        // Apply capacitor jump physics
        this.applyCapacitorJump(entity, inputs.jump);
        
        // Apply movement
        if (inputs.left) {
            this.applyMovement(entity, -1, inputs.run);
        } else if (inputs.right) {
            this.applyMovement(entity, 1, inputs.run);
        }
        
        // Apply gravity
        this.applyGravity(entity);
        
        // Apply friction/resistance
        this.applyResistorFriction(entity);
        
        // Update position
        this.updatePosition(entity);
        
        // Check collisions
        this.checkGroundCollision(entity, groundY);
    }
    
    /**
     * Vehicle physics (simpler - no jumping)
     */
    updateVehicle(vehicle, inputs) {
        const acceleration = 2.0;
        const maxSpeed = vehicle.maxSpeed || 10;
        const friction = 0.9;
        
        // Apply acceleration
        if (inputs.forward) {
            vehicle.velocityX += acceleration * this.deltaTime;
        } else if (inputs.backward) {
            vehicle.velocityX -= acceleration * this.deltaTime;
        }
        
        // Apply friction
        vehicle.velocityX *= friction;
        
        // Limit speed
        if (Math.abs(vehicle.velocityX) > maxSpeed) {
            vehicle.velocityX = Math.sign(vehicle.velocityX) * maxSpeed;
        }
        
        // Update position
        vehicle.x += vehicle.velocityX * this.deltaTime;
    }
}

// Export for use in terminal
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsEngine;
}
