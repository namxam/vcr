import React from 'react';
import { Link } from 'react-router'
import Flex from 'flex-component';
import Slider from 'react-slick';
import PlayIcon from 'react-icons/lib/fa/play';

import style from './FilmDetail.scss';

const settings = {
  variableWidth: true,
  lazyLoad: true,
  draggable: false,
  autoplaySpeed: 4000,
  speed: 1000,
  autoplay: true,
};

const PlayerPreview = ({ chapterId, film }) => (
  <Flex className={style.Slider} grow={1}>
    <Link className={style.playLink} to={{ pathname: `/watch/${chapterId}`, state: { film }}}>
      <PlayIcon className={style.playIcon} />
    </Link>
    {
      film.images &&
      <Slider {...settings}>
        {
          film.images.map((image, i) =>
            <img className={style.Image} key={i} src={image} referrerPolicy='no-referrer' />
          )
        }
      </Slider>
    }
  </Flex>
);

export default PlayerPreview;
