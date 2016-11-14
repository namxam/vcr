import React from 'react'
import Flex from 'flex-component'
import { Link } from 'react-router'
import _ from 'lodash'

import style from './Chapters.scss'

const Episode = ({ film, id, name, number, runtime, title }) => (
  <li key={id} className={style.EpisodeContainer}>
    <Link className={style.Episode} to={{ pathname: `/watch/${id}`, state: { film }}}>
      {
        number &&
        <div className={style.EpisodeNumber}>{number}.</div>
      }
      <span className={style.EpisodeTitle}>{name || title}</span>
      {
        runtime &&
        <span className={style.EpisodeRuntime}>{runtime}min</span>
      }
    </Link>
  </li>
);

const SeasonHeader = ({ season }) => (
  <h2 className={style.SeasonHeader}>Season {season}</h2>
)

export default ({ basePath, film }) => {
  const seasons = _.groupBy(film.chapters, 'season')

  return (
    <div className={style.ChaptersContainer}>
      {film.hasSeasons ? (
        Object.keys(seasons).map(season => (
          <div key={season}>
            <SeasonHeader season={season} />
            <ul className={style.Episodes}>
              {seasons[season].map(chapter => (
                <Episode key={chapter.id} {...chapter} film={film} />
              ))}
            </ul>
          </div>
        ))
      ) : (
        <ul>
          {film.chapters.map(chapter => (
            <Episode key={chapter.id} {...chapter} film={film} />
          ))}
        </ul>
      )}
    </div>
  )
}
