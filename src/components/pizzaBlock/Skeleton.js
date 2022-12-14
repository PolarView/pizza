import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#D1C47F"
    foregroundColor="#CCCC00">
    <rect x="526" y="224" rx="3" ry="3" width="88" height="6" />
    <circle cx="135" cy="175" r="100" />
    <rect x="52" y="288" rx="8" ry="8" width="170" height="22" />
    <rect x="51" y="315" rx="11" ry="11" width="173" height="34" />
    <rect x="52" y="360" rx="4" ry="4" width="67" height="18" />
    <rect x="130" y="362" rx="3" ry="3" width="92" height="17" />
  </ContentLoader>
);

export default Skeleton;
