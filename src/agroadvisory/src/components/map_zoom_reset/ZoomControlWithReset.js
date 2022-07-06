import React from 'react';
import PropTypes from 'prop-types';import { useMap } from 'react-leaflet';

function ZoomControlWithReset(props) {
  const { zoomInTitle, zoomResetTitle, zoomOutTitle, bounds } = props;
  const map = useMap();

  return (
    <div className="leaflet-control leaflet-control-zoom leaflet-bar">
      <a
        className="leaflet-control-zoom-in"
        href="#"
        title={zoomInTitle}
        role="button"
        aria-label="Zoom in"
        onClick={(e) => {
          map.zoomIn();
          e.preventDefault();
        }}
      >
        +
      </a>
      <a
        className="leaflet-control-zoom-out"
        href="#"
        title={zoomOutTitle}
        role="button"
        aria-label="Zoom out"
        onClick={(e) => {
          map.zoomOut();
          e.preventDefault();
        }}
      >
        -
      </a>
      <a
        className="leaflet-control-zoom-out"       
        href="#"
        title={zoomResetTitle}
        role="button"
        aria-label="Reset zoom"
        onClick={(e) => {
          map.fitBounds(bounds);          e.preventDefault();
        }}
      >
        &#8962;      </a>
    </div>
  );
}

ZoomControlWithReset.propTypes = {
  zoomInTitle: PropTypes.string,
  zoomOutTitle: PropTypes.string,
  zoomResetTitle: PropTypes.string,
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

ZoomControlWithReset.defaultProps = {
  zoomInTitle: 'Zoom in',  zoomOutTitle: 'Zoom out',  zoomResetTitle: 'Reset zoom',};

export default ZoomControlWithReset;