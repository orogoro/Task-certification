import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { getCertificateInfo } from 'helper';

import CertificateName from './certificateName/CertificateName';
import CertificateValueInput from './certificateValueInput/CertificateValueInput';

import styles from './App.module.scss';

export const App = () => {
  const [fileValue, setFileValue] = useState(
    JSON.parse(window.localStorage.getItem('certificate')) ?? []
  );
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);

  const handleIdChange = id => {
    if (visible) {
      return;
    }
    setActiveId(id);
  };

  const toggleInputVisibility = () => {
    if (visible) {
      setVisible(false);
      return;
    }
    setVisible(true);
    setActiveId('');
  };

  const fileInput = e => {
    const fr = new FileReader();

    fr.onload = () => {
      const { subjectCN, issuerCN, validFrom, validTill } = getCertificateInfo(
        fr.result
      );

      const result = {
        id: nanoid(),
        subjectName: subjectCN,
        issuerName: issuerCN,
        validFrom: validFrom,
        validTill: validTill,
      };
      setFileValue(pre => [...pre, result]);
    };

    const file = e.target.files[0];

    fr.readAsBinaryString(file);
  };

  useEffect(() => {
    window.localStorage.setItem('certificate', JSON.stringify(fileValue));
  }, [fileValue]);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.containerName}>
          {fileValue.length > 0 ? (
            <div>
              {fileValue?.map(({ id, subjectName }) => (
                <CertificateName
                  key={id}
                  subjectName={subjectName}
                  isActive={handleIdChange}
                  active={activeId === id}
                  id={id}
                  visible={visible}
                />
              ))}
            </div>
          ) : (
            'Додайте ваш сертифікат'
          )}

          <button className={styles.button} onClick={toggleInputVisibility}>
            {visible ? 'Скасувати' : 'Додати'}
          </button>
        </div>

        <label className={styles.lable}>
          {visible && (
            <input
              className={styles.file}
              type="file"
              name="file"
              onChange={fileInput}
              accept=".cer"
            />
          )}
          <div className={`${styles.fake} ${visible ? styles.active : ''}`}>
            {visible && 'Перетягніть файл сертифіката у поле'}
            {!visible &&
              activeId &&
              fileValue?.map(
                ({ id, subjectName, issuerName, validFrom, validTill }) => (
                  <CertificateValueInput
                    key={id}
                    subjectName={subjectName}
                    issuerName={issuerName}
                    validFrom={validFrom}
                    validTill={validTill}
                    active={activeId === id}
                  />
                )
              )}
            {!visible &&
              !activeId &&
              'Виберіть сертифікат, щоб переглянути інформацію'}
          </div>
        </label>
      </div>
    </div>
  );
};
