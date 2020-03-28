import React, { useEffect, useState, useCallback } from 'react';
import ids from './ids';

for (const group of ids) {
  group.sort();
}

function App() {
  const [visible, setVisible] = useState(false);

  const [hidden, setHidden] = useState([]);

  useEffect(() => {
    setInterval(() => {
      setVisible(v => !v);
    }, 200);
  }, []);

  const handleClick = useCallback((e) => {
    const { id } = e.target.dataset;

    fetch(`https://backend.freemap.sk/gallery/pictures/${id}`, {
      "credentials": "include",
      "headers": {
          "Authorization": "Bearer XXX"
      },
      "method": "DELETE",
      "mode": "cors"
    });

    setHidden(h => [...h, Number(id)]);
  }, []);

  const handleOk = useCallback((e) => {
    const { id } = e.target.dataset;
    setHidden(h => [...h, Number(id)]);
  }, []);

  return (
    <div className="App">
      {/* {ids.filter((group, i) => group.length === 3 && !hidden.includes(group[0])).map(images => ( */}
      {ids.filter((group, i) => group.length === 2 && i >= 15000 && i < 16000 && !hidden.includes(group[0])).map(images => (
        <div style={{ position: 'relative' }} key={images[0]}>
          {images.map((id, i) => (
            <React.Fragment key={id}>
              {i > 0 && (
                <img
                  style={{visibility: 'hidden'}}
                  src={`https://backend.freemap.sk/gallery/pictures/${id}/image?width=200`}
                  alt="_"
                />
              )}
              <img
                style={ i > 0
                  ? { position: 'absolute', left: 0, top: 0, pointerEvents: 'none', display: visible ? 'inline' : 'none' }
                  : { opacity: visible ? 0.1 : 1 }
                }
                src={`https://backend.freemap.sk/gallery/pictures/${id}/image?width=200`}
                alt="_"
                onClick={handleClick}
                data-id={id}
              />
            </React.Fragment>
          ))}
          <button data-id={images[0]} onClick={handleOk} style={{verticalAlign: 'top'}}>OK</button>
        </div>
      ))}
      <div style={{ height: '2000px' }} />
    </div>
  );
}

export default App;
