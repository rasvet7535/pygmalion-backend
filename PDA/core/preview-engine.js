class PreviewEngine {
  constructor(Canon, Metronome) {
    this.Canon = Canon;
    this.Metronome = Metronome;
  }

  compute(intent) {
    if (!intent.valid) return { blocked: true, reason: intent.error };

    switch (intent.action) {
      case 'plan':     return this._previewPlan(intent);
      case 'flow':     return this._previewFlow(intent);
      case 'mirror':   return this._previewMirror(intent);
      case 'replay':   return { blocked: false, info: 'Верификация REPLAY', type: 'replay' };
      case 'threshold': return this._previewThreshold(intent);
      default:
        return { blocked: true, reason: `Неизвестное действие: ${intent.action}` };
    }
  }

  _previewPlan(intent) {
    const { actor_ok, triads } = intent.payload;
    const phase = this.Metronome.getCurrentPhase();
    const now = this.Metronome.getCurrentTimeISO();

    if (!this.Metronome.isEmissionAllowed()) {
      return { blocked: true, reason: `Эмиссия запрещена в фазе "${phase}" (19:55-20:00 UTC — тишина)`, phase, time: now };
    }

    const validation = this.Canon.emissionPolicy.validateTriadSelection(triads);
    if (!validation.valid) {
      return { blocked: true, reason: validation.error, phase, time: now };
    }

    const burnAt = this.Metronome.calculateBurnAt();
    const ueNumbers = [];
    for (const t of triads) {
      ueNumbers.push(...this.Canon.emissionPolicy.getUENumbersByTriad(t));
    }

    return {
      blocked: false,
      type: 'emission',
      actor_ok,
      triads,
      ue_numbers: ueNumbers,
      total_ue: validation.totalUE,
      burn_at: burnAt,
      phase,
      time: now,
      act_type: 'EMISSION',
      act_summary: `Эмиссия ${validation.totalUE} У.Е. (${triads.join(', ')}) для ${actor_ok}. Сгорят в ${burnAt.slice(0, 10)}`,
    };
  }

  _previewFlow(intent) {
    const { actor_ok, target_ok, ue_uuid } = intent.payload;
    const phase = this.Metronome.getCurrentPhase();
    const now = this.Metronome.getCurrentTimeISO();

    if (!this.Metronome.isTransferAllowed()) {
      return { blocked: true, reason: `Передача разрешена только в фазе "active" (04:00-19:55 UTC). Текущая: "${phase}"`, phase, time: now };
    }

    return {
      blocked: false,
      type: 'transfer',
      from: actor_ok,
      to: target_ok,
      ue_uuid: ue_uuid || '(авто: последняя активная)',
      phase,
      time: now,
      act_type: 'TRANSFER',
      act_summary: `Передача У.Е. от ${actor_ok} к ${target_ok}`,
    };
  }

  _previewMirror(intent) {
    return {
      blocked: false,
      type: 'mirror',
      ok_id: intent.payload.ok_id,
      info: 'READ-ONLY: данные присутствия',
      read_only: true,
    };
  }

  _previewThreshold(intent) {
    const { ok_key } = intent.payload;

    if (!this.Canon.isValidOK(ok_key)) {
      return { blocked: true, reason: `Некорректный формат О.К.: "${ok_key}". Требуется ::имя::` };
    }

    if (this.Canon.isSystemReserve(ok_key)) {
      return { blocked: true, reason: `О.К. "${ok_key}" в системном резерве (::0::–::33::). Регистрация запрещена.` };
    }

    return {
      blocked: false,
      type: 'threshold',
      ok_key,
      act_type: 'THRESHOLD_CROSSED',
      act_summary: `Регистрация О.К. "${ok_key}" через порог вхождения`,
    };
  }
}

module.exports = PreviewEngine;
