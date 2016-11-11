import React from 'react'
import Flex from 'flex-component'
import sortBy from 'lodash/sortBy'
import CloseIcon from 'react-icons/lib/fa/close'

import BackLink from 'components/BackLink'
import Chapters from 'components/Chapters'
import PlayerPreview from './PlayerPreview'

import { highlightColor } from 'variables.scss'
import style from './FilmDetail.scss'

import { formatPattern } from 'react-router/lib/PatternUtils';

import { fetchDetail } from 'utils/api';
import promised from 'utils/promised';
import { fetchEpisodeDetails } from 'utils/showDataApi';

export default class FilmDetail extends React.Component {
  @promised static loadProps = ({ filmId, filmType }) => (
    fetchDetail(filmId)
      .then(film => ({ film, filmId }))
      .then(data => (
        filmType !== 'movie'
        ? fetchEpisodeDetails(data.film).then(eData => ({ ...data, film: eData }))
        : data
      ))
  )

  shouldComponentUpdate(nextProps) {
    return nextProps.film.id !== this.props.film.id
  }

  render() {
    const { film, location: { pathname, state: { basePath } }, params } = this.props;
    const chapters = sortBy(film.chapters, 'title');

    return (
      <Flex className={style.Container}>
        <Flex className={style.Description} direction="column" shrink={0}>
          <Flex className={style.Title}>{film.title}</Flex>
          <Flex grow={1} className={style.Text}>{film.description}</Flex>
          <BackLink label={<CloseIcon/>} path={basePath} className={style.closeIcon} />
        </Flex>
        {
          (params.filmType === 'show' || chapters.length > 1)
          ? <Chapters film={film} />
          : <PlayerPreview film={film} chapterId={chapters[0].id} />
        }
      </Flex>
    )
  }
}
