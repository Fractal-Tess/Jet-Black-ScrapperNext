export enum IdentifierKind {
  Anime = 'anime',
  Manga = 'manga',
  Fiction = 'fiction'
}

export enum IdentifierName {
  Gogoanime = 'gogoanime',
  Mangakakalot = 'mangakakalot'
}

export enum IdentifierType {
  Scrapper = 'scrapper',
  Controller = 'controller',
  API = 'api'
}

export type LogIdentifiers = {
  idenKind: IdentifierKind
  idenName: IdentifierName
  idenType: IdentifierType
}
