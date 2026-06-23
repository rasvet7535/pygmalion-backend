const logger = require('../../backend/core/logger');

class CanonVersionHandshake {
  constructor() {
    this.Canon = require('../../backend/core/canon');
    this.CANON_VERSION = this.Canon.CANON_VERSION;
    this.EMISSION_POLICY_VERSION = this.Canon.emissionPolicy.EMISSION_POLICY.version;
  }

  getCompatibilityConfig() {
    return {
      canon_version: this.CANON_VERSION,
      emission_policy_version: this.EMISSION_POLICY_VERSION,
      compatibility: {
        min: '0.5.1000.01',
        max: '1.x'
      },
      boot_mode: 'compatible'
    };
  }

  checkCompatibility() {
    const config = this.getCompatibilityConfig();
    const canonVersion = this.CANON_VERSION;
    const policyVersion = this.EMISSION_POLICY_VERSION;
    const minVersion = config.compatibility.min;
    const maxVersion = config.compatibility.max;

    logger.info({ event: 'handshake_start', canon_version: canonVersion, policy_version: policyVersion, min: minVersion, max: maxVersion, boot_mode: config.boot_mode });

    const isCompatible = this._checkVersionInRange(policyVersion, minVersion, maxVersion);

    if (!isCompatible) {
      const errorMsg = `BOOT BLOCKED: Canon ${canonVersion} / Policy ${policyVersion} — expected ${minVersion} - ${maxVersion}`;
      logger.error({ event: 'handshake_failed', canon_version: canonVersion, policy_version: policyVersion, expected_min: minVersion, expected_max: maxVersion });
      return { success: false, error: errorMsg, config };
    }

    logger.info({ event: 'handshake_passed', canon_version: canonVersion, policy_version: policyVersion });
    return { success: true, config };
  }

  _checkVersionInRange(version, minVersion, maxVersion) {
    const v = this._parseVersion(version);
    const min = this._parseVersion(minVersion);
    const max = this._parseMaxVersion(maxVersion);

    if (this._compareVersion(v, min) < 0) return false;
    if (this._compareVersion(v, max) > 0) return false;

    return true;
  }

  _parseVersion(version) {
    const parts = version.split('-')[0].split('.').map(p => parseInt(p, 10) || 0);
    while (parts.length < 4) parts.push(0);
    return parts.slice(0, 4);
  }

  _parseMaxVersion(maxVersion) {
    if (maxVersion.endsWith('.x')) {
      const base = maxVersion.slice(0, -2);
      const explicitParts = base.split('.').map(p => parseInt(p, 10) || 0);
      const wildcardIndex = explicitParts.length;
      const parts = [...explicitParts];
      while (parts.length < 4) parts.push(0);
      return { parts, wildcardIndex };
    }
    return { parts: this._parseVersion(maxVersion), wildcardIndex: -1 };
  }

  _compareVersion(a, b) {
    const bParts = b.parts || b;
    const bWildcard = b.wildcardIndex !== undefined ? b.wildcardIndex : -1;

    const maxLen = Math.max(a.length, bParts.length);
    for (let i = 0; i < maxLen; i++) {
      const av = a[i] || 0;
      const bv = bParts[i] || 0;

      if (i >= bWildcard && bWildcard >= 0) {
        continue;
      }

      if (av !== bv) return av - bv;
    }
    return 0;
  }
}

module.exports = CanonVersionHandshake;