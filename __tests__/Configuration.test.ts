describe('NativeWind Configuration', () => {
  it('babel.config.js exists and is properly configured', () => {
    const babelConfig = require('../babel.config.js')
    expect(babelConfig).toBeDefined()
    expect(typeof babelConfig).toBe('function')
  })

  it('tailwind.config.js exists and is properly configured', () => {
    const tailwindConfig = require('../tailwind.config.js')
    expect(tailwindConfig).toBeDefined()
    expect(tailwindConfig.content).toBeDefined()
    expect(tailwindConfig.theme.extend).toBeDefined()
  })
})

describe('Theme Colors Configuration', () => {
  it('theme exports required color values', () => {
    const { colors } = require('../src/theme')
    expect(colors.primary).toBe('#53B175')
    expect(colors.white).toBe('#FFFFFF')
    expect(colors.black).toBe('#000000')
    expect(colors.primaryDark).toBeDefined()
    expect(colors.darkBg).toBeDefined()
  })
})
