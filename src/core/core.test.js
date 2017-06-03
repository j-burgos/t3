/* eslint-env jest */

import Game from './core'

const p1 = Game.player1
const p2 = Game.player2

it('should return the correct winner by row', () => {
  const row = [p1, p1, p1]
  const row2 = [p2, p2, p2]
  const winner = Game.wonByRow(row, p1, p2)
  const winner2 = Game.wonByRow(row2, p1, p2)
  expect(winner).toEqual(p1)
  expect(winner2).toEqual(p2)
})

it('should return undefined winner', () => {
  const row = [undefined, p2, p2]
  const winner = Game.wonByRow(row, p1, p2)
  expect(winner).toEqual(undefined)
})
