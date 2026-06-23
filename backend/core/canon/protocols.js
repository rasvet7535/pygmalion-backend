/**
 * Protocols Module
 * Доступ к протоколам ::про.1:: – ::про.12::
 */

module.exports = {
  // ========================================
  // Протоколы (полный список)
  // ========================================
  PROTOCOLS: {
    'про.1': {
      id: 'про.1',
      name: 'П.Л.А.Н.',
      full: '::про.1.П.Л.А.Н.::',
      description: 'Эмиссия У.Е. (Recognition Units)',
      minStatus: 'participant',  // only participants can emit
      requires: ['ue_units']
    },
    'про.2': {
      id: 'про.2',
      name: 'Т.О.К.-О.Р.А.К.У.Л.-С.',
      full: '::про.2.Т.О.К.-О.Р.А.К.У.Л.-С.::',
      description: 'Передача благодарности (ro.DAG)',
      minStatus: 'participant', // can transfer
      requires: []
    },
    'про.3': {
      id: 'про.3',
      name: 'К.О.Л.ЛИЦО-ОБЛИК',
      full: '::про.3.К.О.Л.ЛИЦО-ОБЛИК.::',
      description: 'Отражение (репутационный образ)',
      minStatus: 'any', // anyone can view mirror
      requires: []
    },
    'про.4': {
      id: 'про.4',
      name: 'В.Е.С.',
      full: '::про.4.В.Е.С.::',
      description: 'Репутационный вес',
      minStatus: 'participant', // participants can see their weight
      requires: ['um_markers']
    },
    'про.4,5': {
      id: 'про.4,5',
      name: 'Б.Б.О.О.С.С.',
      full: '::про.4,5.Б.Б.О.О.С.С.::',
      description: 'Саморегулирование (Ордена, Отделы, Союзы, Советы)',
      minStatus: 'member', // needs group membership
      requires: ['membership']
    },
    // Протоколы 5-12 могут быть добавлены позже
  },

  // ========================================
  // Проверка доступа к протоколу
  // ========================================
  canAccess: function(protocolId, userStatus) {
    const protocol = this.PROTOCOLS[protocolId];
    if (!protocol) return { allowed: false, reason: 'unknown_protocol' };
    
    const minStatus = protocol.minStatus;
    if (minStatus === 'any') return { allowed: true };
    
    if (minStatus === 'participant' && userStatus === 'participant') {
      return { allowed: true };
    }
    if (minStatus === 'member' && (userStatus === 'member' || userStatus === 'participant')) {
      return { allowed: true };
    }
    
    return { allowed: false, reason: 'insufficient_status' };
  },

  // ========================================
  // Статусы участников
  // ========================================
  STATUSES: {
    GUEST: 'guest',        // только наблюдает
    PARTICIPANT: 'participant', // полноправный участник (имеет О.К.)
    MEMBER: 'member'       // член группы (орден/отдел/союз)
  },

  // ========================================
  // Определение статуса по О.К.
  // ========================================
  getStatus: function(okKey, hasUE, hasUM, hasMembership) {
    if (!okKey) return this.STATUSES.GUEST;
    if (hasMembership) return this.STATUSES.MEMBER;
    if (hasUE || hasUM) return this.STATUSES.PARTICIPANT;
    return this.STATUSES.GUEST;
  }
};