import PropTypes from 'prop-types';

import styles from './CertificateValueInput.module.scss';

function CertificateValueInput({
  subjectName,
  issuerName,
  validFrom,
  validTill,
  active,
}) {
  return (
    <div className={`${styles.list} ${active ? styles.active : ''}`}>
      <p>{` Subject Name: ${subjectName} `}</p>
      <p>{` Issuer Name: ${issuerName} `}</p>
      <p>{` Valid From: ${validFrom.slice(0, 10)} `}</p>
      <p>{` Valid Till: ${validTill.slice(0, 10)} `}</p>
    </div>
  );
}

export default CertificateValueInput;

CertificateValueInput.propTypes = {
  subjectName: PropTypes.string.isRequired,
  issuerName: PropTypes.string.isRequired,
  validFrom: PropTypes.string.isRequired,
  validTill: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};
