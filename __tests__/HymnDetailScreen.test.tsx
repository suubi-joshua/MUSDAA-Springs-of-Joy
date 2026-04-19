import React from 'react'
import { render } from '@testing-library/react-native'
import HymnDetailScreen from '../src/screens/HymnDetailScreen'

jest.mock('../src/hooks/useBookmarks', () => ({
  useBookmarks: () => ({
    isBookmarked: jest.fn(() => false),
    toggleBookmark: jest.fn(),
  }),
}))

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      setOptions: jest.fn(),
      getParent: () => ({
        setOptions: jest.fn(),
      }),
    }),
    useFocusEffect: jest.fn(callback => {
      callback()
    }),
  }
})

const mockRoute = {
  params: {
    id: 1,
    title: 'Test Hymn Title',
    body: 'Test hymn body content',
  },
}

const mockNavigation = {
  setOptions: jest.fn(),
  navigate: jest.fn(),
  getParent: () => ({
    setOptions: jest.fn(),
  }),
}

describe('HymnDetailScreen Header', () => {
  it('renders correctly with hymn title in header', () => {
    const { getByText } = render(<HymnDetailScreen route={mockRoute} navigation={mockNavigation} />)
    expect(getByText('Test Hymn Title')).toBeTruthy()
  })

  it('renders hymn body content', () => {
    const { getByText } = render(<HymnDetailScreen route={mockRoute} navigation={mockNavigation} />)
    expect(getByText('Test hymn body content')).toBeTruthy()
  })

  it('sets navigation options with correct header configuration', () => {
    render(<HymnDetailScreen route={mockRoute} navigation={mockNavigation} />)
    expect(mockNavigation.setOptions).toHaveBeenCalled()
    const setOptionsCalls = mockNavigation.setOptions.mock.calls
    expect(setOptionsCalls.length).toBeGreaterThan(0)
  })
})

describe('HymnDetailScreen Snapshot', () => {
  it('matches snapshot for header alignment', () => {
    const { toJSON } = render(<HymnDetailScreen route={mockRoute} navigation={mockNavigation} />)
    expect(toJSON()).toMatchSnapshot()
  })
})
