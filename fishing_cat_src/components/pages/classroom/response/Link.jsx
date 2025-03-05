import linkPng from '@fishing_cat/assets/response/Link.png';

import style from './response.module.css';

const Link = ({ metadata, size, url }) => {
  const img = metadata?.image ? metadata.image : linkPng;
  let webkitLineClampValue = 1;

  if (metadata?.title && metadata?.description) {
    webkitLineClampValue = 1;
  } else if (metadata?.title || metadata?.description) {
    webkitLineClampValue = 3;
  } else {
    webkitLineClampValue = 5;
  }
  return (
    <div className={size === 'thumbnail' ? `${style.link_border} ${style.thumbnail}` : `${style.link_border}`}>
      <div className={size === 'thumbnail' ? `${style.link_img} ${style.thumbnail}` : `${style.link_img}`}>
        <img
          src={img}
          onError={(event) => {
            event.target.src = linkPng;
            event.onerror = null;
          }}
        />
      </div>
      <div className={size === 'thumbnail' ? `${style.link_detail} ${style.thumbnail}` : `${style.link_detail}`}>
        <p className={style.link_title}>{metadata?.title}</p>
        <p className={style.link_description}>{metadata?.description}</p>
        <p className={style.link_url} style={{ WebkitLineClamp: webkitLineClampValue }}>
          {url}
        </p>
      </div>
    </div>
  );
};

export default Link;
