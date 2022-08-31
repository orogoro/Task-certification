import { useState, useEffect } from 'react';
import ASN1 from '@lapo/asn1js';
import { nanoid } from 'nanoid';

import CertificateName from './certificateName/CertificateName';
import CertificateValueInput from './certificateValueInput/CertificateValueInput';

import styles from './App.module.scss';

export const App = () => {
  const [fileValue, setFileValue] = useState(
    JSON.parse(window.localStorage.getItem('certificate')) ?? []
  );
  const [activeId, setActiveId] = useState('');
  const [visible, setVisible] = useState(false);

  const currentId = id => {
    if (visible) {
      return;
    }
    setActiveId(id);
  };

  const getVisibleInput = () => {
    if (visible) {
      setVisible(false);
      return;
    }
    setVisible(true);
    setActiveId('');
  };

  const getTextValue = seq =>
    seq.sub?.[0] ? seq.sub[0].sub[1].content() : seq.content();

  const fileInput = e => {
    const fr = new FileReader();

    fr.onload = () => {
      const asn1 = ASN1.decode(fr.result);
      const certificateInfo = asn1.sub[0];

      const subjectInfo = certificateInfo.sub[5];
      const issuerInfo = certificateInfo.sub[3];
      const validityInfo = certificateInfo.sub[4];

      const subjectCN = getTextValue(subjectInfo.sub[3]);
      const issuerCN = getTextValue(issuerInfo.sub[2]);
      const validFrom = getTextValue(validityInfo.sub[0]);
      const validTill = getTextValue(validityInfo.sub[1]);

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
          {fileValue.length > 0 && (
            <div>
              {fileValue?.map(({ id, subjectName }) => (
                <CertificateName
                  key={id}
                  subjectName={subjectName}
                  isActive={currentId}
                  active={activeId === id}
                  id={id}
                  visible={visible}
                />
              ))}
            </div>
          )}

          <button className={styles.button} onClick={getVisibleInput}>
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
            />
          )}
          <div className={styles.fake + ' ' + (visible ? styles.active : '')}>
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
