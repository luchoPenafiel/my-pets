import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';

const Wrapper = styled.div`
  height: ${({ height }): string => (height === 'small' ? '300px' : '400px')};
  width: 100%;

  margin-bottom: 20px;

  border-radius: 20px;
  overflow: hidden;
`;

const MarkerWrapper = styled.div`
  width: 43px;
  height: 51px;

  transform: translateY(-51px) translateX(-22px);
`;

const InfoWindowWrapper = styled.div`
  width: 150px;
  padding: 10px;

  position: relative;
  bottom: 45px;
  left: -85px;
  z-index: 10;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 7px 1px rgba(0, 0, 0, 0.3);

  button {
    position: absolute;
    top: 5px;
    right: 5px;

    background: none;
    border: none;
    box-shadow: none;
  }

  a {
    font-size: 12px;
  }
`;

const Name = styled.p`
  margin-top: 0;
  margin-bottom: 10px;

  font-size: 14px;
`;

const Dir = styled.p`
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 12px;
`;

const InfoWindow = ({ place, closeButton }: any): ReactElement => {
  return (
    <InfoWindowWrapper>
      <Name>{place.nombre}</Name>
      <Dir>{place.direccion}</Dir>
      {place.telefono && <a href={`tel:${place.telefono}`}>{place.telefono}</a>}
      <button onClick={closeButton}>X</button>
    </InfoWindowWrapper>
  );
};

const Marker = ({ show, marker, closeButton }: any): ReactElement => {
  return (
    <>
      <MarkerWrapper>
        <svg width={43} height={51} fill="none">
          <path
            d="M42.785 21.751C42.785 36 21.5 50.744 21.5 50.744S.215 35.755.215 21.75C.215 9.88 9.745.255 21.5.255S42.785 9.879 42.785 21.75z"
            fill="#5C0F8B"
          />
          <path
            d="M21.5 33.475c6.41 0 11.608-5.249 11.608-11.723 0-6.475-5.197-11.724-11.608-11.724-6.411 0-11.608 5.249-11.608 11.724 0 6.474 5.197 11.723 11.608 11.723z"
            fill="#fff"
          />
          <path
            d="M29.606 20.113c0-.3-.24-.542-.536-.542a.539.539 0 00-.537.542c0 1.776-1.429 3.22-3.187 3.22-1.622 0-2.963-1.23-3.16-2.815a4.86 4.86 0 001.306-.549 5.018 5.018 0 001.61-1.514c.345-.513.844-1.398.379-1.983-.373-.47-1.11-.36-1.643-.36-1.252-.002-2.506-.002-3.757 0-.515 0-1.049-.038-1.56.015-.343.035-.688.157-.849.489-.156.322-.085.711.038 1.032.549 1.422 1.89 2.497 3.35 2.855-.19 1.591-1.535 2.83-3.163 2.83-1.758 0-3.187-1.443-3.187-3.218 0-.3-.24-.542-.537-.542a.539.539 0 00-.536.542c0 2.2 1.643 4.018 3.755 4.272.251 2.132 2.052 3.792 4.23 3.792 2.178 0 3.98-1.659 4.23-3.792 2.112-.255 3.754-2.073 3.754-4.274zm-7.985 6.98c-1.589 0-2.909-1.179-3.149-2.716a4.275 4.275 0 003.149-2.175 4.265 4.265 0 003.148 2.175c-.24 1.537-1.56 2.716-3.148 2.716z"
            fill="#5C0F8B"
          />
        </svg>
      </MarkerWrapper>
      {show && <InfoWindow place={marker} closeButton={closeButton} />}
    </>
  );
};

type MapType = {
  markers?: { [key: string]: any }[];
  height?: 'big' | 'small';
};

const Map = ({ markers, height }: MapType): ReactElement => {
  const [state, setState] = useState<any[]>();

  const mapProps = {
    zoom: markers.length > 1 ? 12 : 15,
    center: {
      lat: markers[0].ubicacion.latitude,
      lng: markers[0].ubicacion.longitude,
    },
  };

  const onChildClickCallback = ({ marker }) => {
    const filterState = state.filter((m) => m.id !== marker.id);
    const findedState = state.find((m) => m.id === marker.id);

    filterState.push({ id: marker.id, showIndoWindow: !findedState.showIndoWindow });

    setState(filterState);
  };

  useEffect(() => {
    const makersToState = [];

    markers.forEach((marker) => {
      makersToState.push({ id: marker.id, showIndoWindow: false });
    });

    setState(makersToState);
  }, []);

  return (
    <Wrapper height={height}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyB_uJhI8xR2Rw67F6EH_Jo7OkQtXyDFtxU',
        }}
        defaultCenter={mapProps.center}
        defaultZoom={mapProps.zoom}
        onChildClick={(key, marker) => onChildClickCallback(marker)}
        yesIWantToUseGoogleMapApiInternals
      >
        {markers.map((marker) => {
          if (marker.ubicacion) {
            const show = state?.find((m) => m.id === marker.id);

            return (
              <Marker
                key={marker.id}
                lat={marker.ubicacion.latitude}
                lng={marker.ubicacion.longitude}
                marker={marker}
                show={show?.showIndoWindow}
                closeButton={() => onChildClickCallback({ marker })}
              />
            );
          }
        })}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default Map;
