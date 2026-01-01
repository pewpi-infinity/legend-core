/**
 * ∞ INFINITY PRICING ENGINE INJECTION
 * Authority: pewpi-infinity/infinity-treasury
 * Provides value calculation and pricing logic
 */

(function() {
  'use strict';

  window.INFINITY_PRICING = {
    version: '1.0.0',
    authority: 'pewpi-infinity/infinity-treasury',
    injected: true,

    // Pricing rules and constants
    rules: {
      base_value: 1.0,
      multipliers: {
        priority_highest: 5.0,
        priority_high: 3.0,
        priority_medium: 1.5,
        priority_low: 1.0
      },
      features: {
        best_graphics: 100,
        fantastic_design: 80,
        friend_sharing: 50,
        login_system: 150,
        personal_page_upgrade: 200
      }
    },

    /**
     * Calculate value for a repository configuration
     * @param {Object} config - Repository configuration
     * @returns {Number} Calculated value
     */
    calculateValue: function(config) {
      let value = this.rules.base_value;

      // Apply priority multiplier
      if (config.priority) {
        const multiplierKey = 'priority_' + config.priority.toLowerCase();
        value *= this.rules.multipliers[multiplierKey] || 1.0;
      }

      // Add feature values
      if (config.features && Array.isArray(config.features)) {
        config.features.forEach(feature => {
          value += this.rules.features[feature] || 0;
        });
      }

      // Role bonuses
      if (config.roles && Array.isArray(config.roles)) {
        value += config.roles.length * 10;
      }

      return Math.round(value * 100) / 100;
    },

    /**
     * Calculate pricing tier
     * @param {Number} value - Calculated value
     * @returns {String} Pricing tier
     */
    getTier: function(value) {
      if (value >= 500) return 'PREMIUM';
      if (value >= 200) return 'PROFESSIONAL';
      if (value >= 50) return 'STANDARD';
      return 'BASIC';
    },

    /**
     * Get pricing details for a configuration
     * @param {Object} config - Repository configuration
     * @returns {Object} Pricing details
     */
    getPricingDetails: function(config) {
      const value = this.calculateValue(config);
      const tier = this.getTier(value);

      return {
        value: value,
        tier: tier,
        currency: '∞',
        timestamp: new Date().toISOString(),
        authority: this.authority
      };
    },

    /**
     * Validate pricing authority
     * @returns {Boolean} True if this is a pricing authority
     */
    isPricingAuthority: function() {
      return window.location.href.includes('infinity-treasury');
    },

    /**
     * Log pricing calculation
     * @param {String} repo - Repository name
     * @param {Object} details - Pricing details
     */
    logPricing: function(repo, details) {
      console.log(`💰 Pricing calculated for ${repo}:`, details);
    }
  };

  // Initialize pricing system
  console.log('💰 Infinity Pricing Engine loaded');
  console.log('   Authority:', window.INFINITY_PRICING.authority);
  console.log('   Version:', window.INFINITY_PRICING.version);

})();
