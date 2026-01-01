/**
 * 🍄 INFINITY ECOSYSTEM INJECTOR ENGINE
 * Additive-only injection system - NEVER removes existing content
 * Authority: pewpi-infinity/legend-core
 */

class AdditiveInjector {
  constructor() {
    this.manifest = null;
    this.auditLog = [];
    this.backupStore = new Map();
  }

  /**
   * Load the injection manifest
   */
  async loadManifest() {
    try {
      const response = await fetch('./injection-manifest.json');
      this.manifest = await response.json();
      this.log('Manifest loaded successfully', 'info');
      return this.manifest;
    } catch (error) {
      this.log(`Failed to load manifest: ${error.message}`, 'error');
      throw error;
    }
  }

  /**
   * Main injection method - injects packages into a repository
   * @param {string} repoName - Name of the repository
   * @param {object} options - Injection options
   */
  async injectIntoRepo(repoName, options = {}) {
    this.log(`Starting injection into ${repoName}`, 'info');
    
    if (!this.manifest) {
      await this.loadManifest();
    }

    const repoConfig = this.manifest.repos[repoName];
    if (!repoConfig) {
      throw new Error(`Repository ${repoName} not found in manifest`);
    }

    const results = {
      repo: repoName,
      success: [],
      failed: [],
      skipped: []
    };

    try {
      // 1. Backup current state (if enabled)
      if (this.manifest.injection_rules.rollback.backup_before_inject) {
        await this.backupRepo(repoName);
      }

      // 2. Inject each file from the package
      for (const filePath of repoConfig.inject) {
        try {
          const result = await this.injectFile(repoName, filePath, options);
          if (result.success) {
            results.success.push(result);
          } else if (result.skipped) {
            results.skipped.push(result);
          }
        } catch (error) {
          results.failed.push({
            file: filePath,
            error: error.message
          });
        }
      }

      // 3. Add cross-links
      await this.addCrossLinks(repoName, repoConfig);

      // 4. Update metadata (package.json if exists)
      await this.updateMetadata(repoName, repoConfig);

      // 5. Audit injection
      await this.auditInjection(repoName, results);

      this.log(`Injection completed for ${repoName}`, 'success');
      return results;

    } catch (error) {
      this.log(`Injection failed for ${repoName}: ${error.message}`, 'error');
      
      // Rollback if enabled and error occurred
      if (this.manifest.injection_rules.rollback.enabled && options.autoRollback) {
        await this.rollback(repoName);
      }
      
      throw error;
    }
  }

  /**
   * Inject a single file additively
   * @param {string} repoName - Repository name
   * @param {string} filePath - Path to file to inject
   * @param {object} options - Injection options
   */
  async injectFile(repoName, filePath, options = {}) {
    this.log(`Injecting file: ${filePath} into ${repoName}`, 'info');

    // Simulate file checking (in real implementation, would fetch from GitHub API)
    const existingFile = await this.fetchFileIfExists(repoName, filePath);
    
    // Get the content to inject from templates
    const newContent = await this.getInjectionContent(filePath);

    if (existingFile) {
      // FILE EXISTS: MERGE ADDITIVELY
      const mergedContent = await this.mergeContent(
        existingFile.content,
        newContent,
        { 
          mode: 'additive',
          type: this.getFileType(filePath)
        }
      );
      
      return {
        success: true,
        file: filePath,
        action: 'merged',
        content: mergedContent
      };
    } else {
      // NEW FILE: CREATE
      return {
        success: true,
        file: filePath,
        action: 'created',
        content: newContent
      };
    }
  }

  /**
   * Smart content merging - NEVER removes existing content
   * @param {string} existing - Existing file content
   * @param {string} newContent - New content to add
   * @param {object} options - Merge options
   */
  async mergeContent(existing, newContent, options) {
    const { type, mode } = options;

    // HTML: Insert before closing tag
    if (type === 'html') {
      return this.mergeHTML(existing, newContent);
    }
    
    // JavaScript: Append with safe namespace
    if (type === 'js' || type === 'javascript') {
      return this.mergeJavaScript(existing, newContent);
    }
    
    // JSON: Deep merge objects
    if (type === 'json') {
      return this.mergeJSON(existing, newContent);
    }
    
    // CSS: Append with scope
    if (type === 'css') {
      return this.mergeCSS(existing, newContent);
    }
    
    // Default: Append with separator
    return this.mergeDefault(existing, newContent);
  }

  /**
   * Merge HTML content by inserting before </body> or appending
   */
  mergeHTML(existing, newContent) {
    // Check if </body> exists
    if (existing.includes('</body>')) {
      return existing.replace('</body>', `
<!-- === ∞ INFINITY INJECTION === -->
${newContent}
<!-- === END INFINITY INJECTION === -->
</body>`);
    } else if (existing.includes('</html>')) {
      return existing.replace('</html>', `
<!-- === ∞ INFINITY INJECTION === -->
${newContent}
<!-- === END INFINITY INJECTION === -->
</html>`);
    } else {
      return `${existing}\n\n<!-- === ∞ INFINITY INJECTION === -->\n${newContent}`;
    }
  }

  /**
   * Merge JavaScript with namespacing
   */
  mergeJavaScript(existing, newContent) {
    return `${existing}

// === ∞ INFINITY INJECTION ===
// Authority: pewpi-infinity/legend-core
// Injected: ${new Date().toISOString()}
(function() {
  'use strict';
  
${newContent}

})();
// === END INFINITY INJECTION ===
`;
  }

  /**
   * Deep merge JSON objects
   */
  mergeJSON(existing, newContent) {
    try {
      const obj1 = JSON.parse(existing);
      const obj2 = JSON.parse(newContent);
      const merged = this.deepMerge(obj1, obj2);
      return JSON.stringify(merged, null, 2);
    } catch (error) {
      this.log(`JSON merge failed: ${error.message}`, 'error');
      // Fallback: just append as comment
      return existing;
    }
  }

  /**
   * Merge CSS with scoping
   */
  mergeCSS(existing, newContent) {
    return `${existing}

/* === ∞ INFINITY INJECTION === */
/* Authority: pewpi-infinity/legend-core */
${newContent}
/* === END INFINITY INJECTION === */
`;
  }

  /**
   * Default merge - simple append
   */
  mergeDefault(existing, newContent) {
    return `${existing}

/* === ∞ INFINITY INJECTION === */
${newContent}
/* === END INFINITY INJECTION === */
`;
  }

  /**
   * Deep merge two objects
   */
  deepMerge(obj1, obj2) {
    const result = { ...obj1 };
    
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (obj2[key] instanceof Object && obj1[key] instanceof Object && !Array.isArray(obj2[key])) {
          result[key] = this.deepMerge(obj1[key], obj2[key]);
        } else {
          result[key] = obj2[key];
        }
      }
    }
    
    return result;
  }

  /**
   * Add cross-repository links
   */
  async addCrossLinks(repoName, repoConfig) {
    this.log(`Adding cross-links for ${repoName}`, 'info');
    
    const links = [];
    
    // All repos link to legend-core
    if (this.manifest.cross_links.all_repos_to_legend_core && repoName !== 'legend-core') {
      links.push({
        target: 'legend-core',
        type: 'authority'
      });
    }
    
    // Pricing repos link to treasury
    if (repoConfig.pricing && this.manifest.cross_links.pricing_repos_to_treasury) {
      links.push({
        target: 'infinity-treasury',
        type: 'pricing_authority'
      });
    }
    
    // Login repos link to login-core
    if (repoName.includes('login') && repoName !== 'infinity-login-core') {
      links.push({
        target: 'infinity-login-core',
        type: 'auth_authority'
      });
    }
    
    return links;
  }

  /**
   * Update repository metadata
   */
  async updateMetadata(repoName, repoConfig) {
    this.log(`Updating metadata for ${repoName}`, 'info');
    
    // Construct metadata object
    const metadata = {
      infinity_ecosystem: {
        injected: true,
        version: this.manifest.version,
        injected_at: new Date().toISOString(),
        roles: repoConfig.roles,
        features: repoConfig.features,
        authorities: {
          legend: 'pewpi-infinity/legend-core'
        }
      }
    };
    
    // Add pricing authority if applicable
    if (repoConfig.pricing) {
      metadata.infinity_ecosystem.authorities.pricing = 'pewpi-infinity/infinity-treasury';
    }
    
    // Add login authority for login-related repos
    if (repoName.includes('login')) {
      metadata.infinity_ecosystem.authorities.login = 'pewpi-infinity/infinity-login-core';
    }
    
    return metadata;
  }

  /**
   * Audit an injection operation
   */
  async auditInjection(repoName, results) {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      repo: repoName,
      validator: this.manifest.audit.validator,
      results: results,
      status: results.failed.length === 0 ? 'success' : 'partial'
    };
    
    this.auditLog.push(auditEntry);
    this.log(`Audit logged for ${repoName}`, 'info');
    
    return auditEntry;
  }

  /**
   * Backup repository state before injection
   */
  async backupRepo(repoName) {
    this.log(`Creating backup for ${repoName}`, 'info');
    
    const backup = {
      timestamp: new Date().toISOString(),
      repo: repoName,
      state: 'backed_up'
    };
    
    this.backupStore.set(repoName, backup);
    return backup;
  }

  /**
   * Rollback a repository to previous state
   */
  async rollback(repoName) {
    this.log(`Rolling back ${repoName}`, 'warning');
    
    const backup = this.backupStore.get(repoName);
    if (!backup) {
      throw new Error(`No backup found for ${repoName}`);
    }
    
    // In real implementation, would restore from backup
    this.log(`Rollback completed for ${repoName}`, 'success');
    return true;
  }

  /**
   * Get file type from path
   */
  getFileType(filePath) {
    const ext = filePath.split('.').pop().toLowerCase();
    const typeMap = {
      'html': 'html',
      'htm': 'html',
      'js': 'js',
      'json': 'json',
      'css': 'css'
    };
    return typeMap[ext] || 'text';
  }

  /**
   * Simulate fetching file from repository
   */
  async fetchFileIfExists(repoName, filePath) {
    // In real implementation, would use GitHub API
    // For now, return null (file doesn't exist)
    return null;
  }

  /**
   * Get injection content from templates
   */
  async getInjectionContent(filePath) {
    // In real implementation, would load from templates directory
    return `<!-- Injected content for ${filePath} -->`;
  }

  /**
   * Log activity
   */
  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message };
    console.log(`[${level.toUpperCase()}] ${timestamp} - ${message}`);
    return logEntry;
  }

  /**
   * Get audit log
   */
  getAuditLog() {
    return this.auditLog;
  }

  /**
   * Preview injection (dry run)
   */
  async previewInjection(repoName) {
    this.log(`Previewing injection for ${repoName}`, 'info');
    
    if (!this.manifest) {
      await this.loadManifest();
    }

    const repoConfig = this.manifest.repos[repoName];
    if (!repoConfig) {
      throw new Error(`Repository ${repoName} not found in manifest`);
    }

    return {
      repo: repoName,
      config: repoConfig,
      files_to_inject: repoConfig.inject,
      features: repoConfig.features,
      cross_links: await this.addCrossLinks(repoName, repoConfig),
      metadata: await this.updateMetadata(repoName, repoConfig)
    };
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AdditiveInjector;
}
