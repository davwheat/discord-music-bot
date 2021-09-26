export default {
  app: {
    px: 'm/',
    playing: 'music',
  },

  opt: {
    DJ: {
      enabled: false,
      roleName: 'DJ',
      commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'seek', 'shuffle', 'skip', 'stop', 'volume'],
    },
    maxVol: 25,
    discordPlayer: {},
  },

  emoji: {
    green: `<:outageNone:729470302328717424>`,
    orange: `<:outageMinor:729470302026727446>`,
    red: `<:outageCritical:729470302513528882>`,
  },
} as const;
