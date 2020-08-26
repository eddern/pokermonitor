export const invertHex = hex => {
    return '#' + (Number(`0x1${hex.replace('#','')}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }