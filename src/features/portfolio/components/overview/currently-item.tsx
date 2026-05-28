import { BookOpenIcon, GamepadIcon } from "lucide-react"

import { USER } from "@/features/portfolio/data/user"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"

export function CurrentlyReadingItem() {
  const book = USER.currentlyReading
  if (!book) return null

  return (
    <IntroItem>
      <IntroItemIcon>
        <BookOpenIcon />
      </IntroItemIcon>
      <IntroItemContent>
        <span className="text-muted-foreground">Reading: </span>
        {book.url ? (
          <IntroItemLink href={book.url} aria-label={`Currently reading: ${book.title} by ${book.author}`}>
            {book.title}
          </IntroItemLink>
        ) : (
          <span>{book.title}</span>
        )}
        <span className="text-muted-foreground"> by {book.author}</span>
      </IntroItemContent>
    </IntroItem>
  )
}

export function CurrentlyPlayingItem() {
  const game = USER.currentlyPlaying
  if (!game) return null

  return (
    <IntroItem>
      <IntroItemIcon>
        <GamepadIcon />
      </IntroItemIcon>
      <IntroItemContent>
        <span className="text-muted-foreground">Playing: </span>
        {game.url ? (
          <IntroItemLink href={game.url} aria-label={`Currently playing: ${game.title}`}>
            {game.title}
          </IntroItemLink>
        ) : (
          <span>{game.title}</span>
        )}
        {game.platform && (
          <span className="text-muted-foreground"> on {game.platform}</span>
        )}
      </IntroItemContent>
    </IntroItem>
  )
}
