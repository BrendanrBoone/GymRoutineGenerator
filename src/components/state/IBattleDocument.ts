/**
 * IBattleDocuments.ts
 * 
 * Defines all values stored for a player
 */
export interface IPlayer {
    uid: string,
    name: string,
    countLP: number,
    win: number,
    loss: number
}